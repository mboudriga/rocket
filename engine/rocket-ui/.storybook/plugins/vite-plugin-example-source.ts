import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import type { Plugin } from 'vite';

const traverse = _traverse.default ?? _traverse;

function dedent(text: string): string {
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  if (!nonEmptyLines.length) return text.trim();
  const minIndent = Math.min(
    ...nonEmptyLines.map((l) => l.match(/^(\s*)/)?.[0].length ?? 0)
  );
  return lines
    .map((l) => l.slice(minIndent))
    .join('\n')
    .trim();
}

export default function exampleSourcePlugin(): Plugin {
  return {
    name: 'vite-plugin-example-source',
    enforce: 'pre',

    transform(code: string, id: string) {
      if (!id.endsWith('.examples.tsx')) return;

      let ast: ReturnType<typeof parse>;
      try {
        ast = parse(code, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        });
      } catch {
        return;
      }

      const injections: Array<{ pos: number; text: string }> = [];

      traverse(ast, {
        JSXElement(path) {
          const opening = path.node.openingElement;
          if (
            opening.name.type !== 'JSXIdentifier' ||
            opening.name.name !== 'ExampleSection'
          )
            return;

          const closingElement = path.node.closingElement;
          if (!closingElement || opening.end == null || closingElement.start == null) return;

          const childrenSource = code.slice(opening.end, closingElement.start);
          const dedented = dedent(childrenSource);
          if (!dedented) return;

          const escaped = JSON.stringify(dedented);
          const attr = ` sourceCode={${escaped}}`;

          // Insert before the closing `>` of the opening tag
          injections.push({ pos: opening.end - 1, text: attr });
        },
      });

      if (!injections.length) return;

      let result = code;
      for (const inj of injections.sort((a, b) => b.pos - a.pos)) {
        result = result.slice(0, inj.pos) + inj.text + result.slice(inj.pos);
      }

      return { code: result, map: null };
    },
  };
}
