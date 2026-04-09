import { dequal } from 'dequal/lite';
import { Fragment, isValidElement } from 'react';

const ALWAYS_EXCLUDED = ['ref', 'recipe', 'asChild', 'unstyled'];

function formatReactElement(el: React.ReactElement<any>): string {
  const type = (el as any).type;
  const name = typeof type === 'string' ? type : type?.displayName || type?.name || null;
  return name ? `<${name} />` : '{/* element */}';
}

function indentBlock(str: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return str
    .split('\n')
    .map((line) => `${pad}${line}`)
    .join('\n');
}

function formatJsValue(value: unknown): string {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (isValidElement(value)) {
    return formatReactElement(value as React.ReactElement<any>);
  }
  if (typeof value === 'function') {
    return '() => {}';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    const items = value.map(formatJsValue);
    const compact = `[${items.join(', ')}]`;
    if (compact.length <= 60 && !compact.includes('\n')) {
      return compact;
    }
    return `[\n${items.map((item) => `${indentBlock(item, 2)},`).join('\n')}\n]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined
    );
    if (entries.length === 0) {
      return '{}';
    }
    const pairs = entries.map(([k, v]) => `${k}: ${formatJsValue(v)}`);
    const compact = `{ ${pairs.join(', ')} }`;
    if (compact.length <= 60 && !compact.includes('\n')) {
      return compact;
    }
    return `{\n${pairs.map((p) => `  ${p},`).join('\n')}\n}`;
  }

  return String(value);
}

function serializeValue(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'function') {
    return null;
  }
  if (isValidElement(value)) {
    return null;
  }
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return `{${value}}`;
  }
  if (Array.isArray(value)) {
    return `{${formatJsValue(value)}}`;
  }
  if (typeof value === 'object') {
    return `{${formatJsValue(value)}}`;
  }
  return null;
}

function shouldExcludeProp(key: string, value: unknown, argTypes?: Record<string, any>): boolean {
  if (ALWAYS_EXCLUDED.includes(key)) {
    return true;
  }
  if (argTypes?.[key]?.table?.disable) {
    return true;
  }
  if (typeof value === 'function') {
    return true;
  }
  if (value === undefined) {
    return true;
  }
  if (isValidElement(value)) {
    return true;
  }
  return false;
}

function isNonDefaultValue(value: unknown): boolean {
  if (value === false || value === '' || value === 0) {
    return false;
  }
  if (value === null || value === undefined) {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return true;
}

function getChangedProps(
  args: Record<string, unknown>,
  initialArgs: Record<string, unknown>,
  argTypes?: Record<string, any>
): Record<string, unknown> {
  const changed: Record<string, unknown> = {};

  for (const key of Object.keys(args)) {
    if (key === 'children') {
      continue;
    }
    if (shouldExcludeProp(key, args[key], argTypes)) {
      continue;
    }
    if (!dequal(args[key], initialArgs[key]) || isNonDefaultValue(initialArgs[key])) {
      changed[key] = args[key];
    }
  }

  return changed;
}

function buildPropAttribute(key: string, value: unknown): string | null {
  if (typeof value === 'boolean') {
    return value ? key : `${key}={false}`;
  }
  const serialized = serializeValue(value);
  return serialized ? `${key}=${serialized}` : null;
}

function extractTextContent(node: unknown): string | null {
  if (node === null || node === undefined) {
    return null;
  }
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number') {
    return String(node);
  }
  if (typeof node === 'boolean') {
    return node ? String(node) : null;
  }
  if (Array.isArray(node)) {
    const parts = node.map(extractTextContent).filter((p): p is string => p !== null);
    return parts.length > 0 ? parts.join('') : null;
  }
  if (isValidElement(node)) {
    if ((node as any).type === Fragment) {
      return extractTextContent((node as any).props?.children);
    }
    return null;
  }
  return null;
}

function serializeChildren(children: unknown): string | null {
  if (children === null || children === undefined) {
    return null;
  }
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return `{${children}}`;
  }
  if (typeof children === 'boolean') {
    return children ? `{${children}}` : null;
  }

  if (isValidElement(children)) {
    const text = extractTextContent(children);
    return text ?? '{/* content */}';
  }

  if (Array.isArray(children)) {
    if (children.every((c) => typeof c === 'string' || typeof c === 'number')) {
      return `{${formatJsValue(children)}}`;
    }
    const text = extractTextContent(children);
    return text ?? '{/* content */}';
  }

  return `{${formatJsValue(children)}}`;
}

function generateJsx(
  name: string,
  args: Record<string, unknown>,
  initialArgs: Record<string, unknown>,
  argTypes?: Record<string, any>
): string {
  const changed = getChangedProps(args, initialArgs, argTypes);
  const children = args.children;
  const childrenStr = serializeChildren(children);
  const hasChildren = childrenStr !== null;

  const propEntries = Object.entries(changed)
    .map(([key, value]) => buildPropAttribute(key, value))
    .filter(Boolean) as Array<string>;

  const hasMultilineProps = propEntries.some((p) => p.includes('\n'));

  if (propEntries.length === 0 && !hasChildren) {
    return `<${name} />`;
  }

  if (!hasChildren) {
    if (propEntries.length <= 2 && !hasMultilineProps) {
      return `<${name} ${propEntries.join(' ')} />`;
    }
    const propsBlock = propEntries.map((p) => indentBlock(p, 2)).join('\n');
    return `<${name}\n${propsBlock}\n/>`;
  }

  if (propEntries.length === 0) {
    return `<${name}>${childrenStr}</${name}>`;
  }

  if (propEntries.length <= 2 && !hasMultilineProps) {
    return `<${name} ${propEntries.join(' ')}>${childrenStr}</${name}>`;
  }

  const propsBlock = propEntries.map((p) => indentBlock(p, 2)).join('\n');
  return `<${name}\n${propsBlock}\n>\n  ${childrenStr}\n</${name}>`;
}

export { generateJsx };

export const _internal = {
  serializeValue,
  shouldExcludeProp,
  getChangedProps,
  buildPropAttribute,
  isNonDefaultValue,
  extractTextContent,
  serializeChildren,
  formatJsValue,
  formatReactElement,
  indentBlock,
};
