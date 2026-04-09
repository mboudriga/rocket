import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const traverse = (_traverse as unknown as { default: typeof _traverse }).default ?? _traverse;

type DefaultsMap = Record<string, Record<string, string>>;

/** Recursively find all *.types.ts files under a directory */
function findTypesFiles(dir: string): Array<string> {
	const results: Array<string> = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			results.push(...findTypesFiles(full));
		} else if (entry.endsWith('.types.ts')) {
			results.push(full);
		}
	}
	return results;
}

/** Parse a .types.ts file and extract all `export const XDefaultProps = { ... }` objects */
function extractDefaultProps(code: string): DefaultsMap {
	const map: DefaultsMap = {};

	let ast: ReturnType<typeof parse>;
	try {
		ast = parse(code, { sourceType: 'module', plugins: ['typescript'] });
	} catch {
		return map;
	}

	traverse(ast, {
		ExportNamedDeclaration(path) {
			const decl = path.node.declaration;
			if (decl?.type !== 'VariableDeclaration') return;

			for (const declarator of decl.declarations) {
				if (declarator.id.type !== 'Identifier') continue;
				if (!declarator.id.name.endsWith('DefaultProps')) continue;
				if (!declarator.init || declarator.init.type !== 'ObjectExpression') continue;

				const props: Record<string, string> = {};
				for (const prop of declarator.init.properties) {
					if (prop.type !== 'ObjectProperty') continue;
					if (prop.key.type !== 'Identifier') continue;

					const val = prop.value;
					switch (val.type) {
						case 'StringLiteral':
							props[prop.key.name] = val.value;
							break;
						case 'NumericLiteral':
							props[prop.key.name] = String(val.value);
							break;
						case 'BooleanLiteral':
							props[prop.key.name] = String(val.value);
							break;
						case 'NullLiteral':
							props[prop.key.name] = 'null';
							break;
						case 'UnaryExpression':
							if (val.operator === '-' && val.argument.type === 'NumericLiteral') {
								props[prop.key.name] = String(-val.argument.value);
							}
							break;
						// Skip complex expressions (functions, member expressions, etc.)
					}
				}

				if (Object.keys(props).length > 0) {
					map[declarator.id.name] = props;
				}
			}
		},
	});

	return map;
}

/** Build the full map by scanning all .types.ts files under componentsDir */
function buildDefaultPropsMap(componentsDir: string): DefaultsMap {
	const map: DefaultsMap = {};
	for (const file of findTypesFiles(componentsDir)) {
		const code = readFileSync(file, 'utf-8');
		const fileMap = extractDefaultProps(code);
		Object.assign(map, fileMap);
	}
	return map;
}

/**
 * Vite plugin that resolves DefaultProps references in react-docgen-typescript output.
 *
 * Runs AFTER the docgen plugin (enforce: 'post') and replaces default value strings
 * like "ButtonDefaultProps.variant" with the actual resolved value "solid".
 */
export default function resolveDefaultPropsPlugin(): Plugin {
	let map: DefaultsMap = {};

	return {
		name: 'vite-plugin-resolve-default-props',
		enforce: 'post',

		buildStart() {
			const pluginDir = dirname(fileURLToPath(import.meta.url));
			const componentsDir = resolve(pluginDir, '../../src/components');
			map = buildDefaultPropsMap(componentsDir);
		},

		transform(code: string) {
			if (!code.includes('__docgenInfo')) return;

			let result = code;

			// Handle XDefaultProps.propName ?? fallback patterns (must run first — longer match)
			// Supports both "..." and `...` quote styles (bundler may use either)
			// Fallback can be quoted ('value', "value", `value`) or unquoted (false, 0, null)
			result = result.replace(
				/(["`])(\w+DefaultProps)\.(\w+)\s*\?\?\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(\w+))\1/g,
				(match, quote: string, objName: string, propName: string, f1?: string, f2?: string, f3?: string, f4?: string) => {
					const fallback = f1 ?? f2 ?? f3 ?? f4 ?? '';
					const resolved = map[objName]?.[propName];
					return `${quote}${resolved ?? fallback}${quote}`;
				},
			);

			// Handle XDefaultProps.propName patterns
			// Supports both "..." and `...` quote styles
			result = result.replace(
				/(["`])(\w+DefaultProps)\.(\w+)\1/g,
				(match, quote: string, objName: string, propName: string) => {
					const resolved = map[objName]?.[propName];
					return resolved !== undefined ? `${quote}${resolved}${quote}` : match;
				},
			);

			return result !== code ? { code: result, map: null } : undefined;
		},
	};
}
