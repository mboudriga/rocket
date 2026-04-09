import { createElement, Fragment } from 'react';
import { describe, expect, it } from 'vitest';
import { _internal, generateJsx } from './generateJsx';

const {
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
} = _internal;

// ─── serializeValue ──────────────────────────────────────────────

describe('serializeValue', () => {
  it('returns quoted string for strings', () => {
    expect(serializeValue('hello')).toBe('"hello"');
  });

  it('escapes double quotes in strings', () => {
    expect(serializeValue('say "hi"')).toBe('"say \\"hi\\""');
  });

  it('wraps numbers in braces', () => {
    expect(serializeValue(42)).toBe('{42}');
  });

  it('wraps booleans in braces', () => {
    expect(serializeValue(true)).toBe('{true}');
    expect(serializeValue(false)).toBe('{false}');
  });

  it('returns null for null', () => {
    expect(serializeValue(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(serializeValue(undefined)).toBeNull();
  });

  it('returns null for functions', () => {
    expect(serializeValue(() => {})).toBeNull();
  });

  it('serializes arrays with JS formatting in braces', () => {
    expect(serializeValue([1, 2, 3])).toBe('{[1, 2, 3]}');
  });

  it('serializes objects with JS formatting in braces', () => {
    expect(serializeValue({ a: 1 })).toBe('{{ a: 1 }}');
  });

  it('returns null for React elements', () => {
    expect(serializeValue(createElement('div'))).toBeNull();
  });
});

// ─── shouldExcludeProp ───────────────────────────────────────────

describe('shouldExcludeProp', () => {
  it('excludes always-excluded props', () => {
    expect(shouldExcludeProp('recipe', 'value')).toBe(true);
    expect(shouldExcludeProp('asChild', true)).toBe(true);
    expect(shouldExcludeProp('unstyled', false)).toBe(true);
  });

  it('excludes props hidden via argTypes', () => {
    const argTypes = { hidden: { table: { disable: true } } };
    expect(shouldExcludeProp('hidden', 'value', argTypes)).toBe(true);
  });

  it('excludes functions', () => {
    expect(shouldExcludeProp('onClick', () => {})).toBe(true);
  });

  it('excludes undefined values', () => {
    expect(shouldExcludeProp('size', undefined)).toBe(true);
  });

  it('excludes React elements', () => {
    expect(shouldExcludeProp('icon', createElement('span'))).toBe(true);
  });

  it('allows normal props', () => {
    expect(shouldExcludeProp('size', 'md')).toBe(false);
    expect(shouldExcludeProp('loading', true)).toBe(false);
  });
});

// ─── isNonDefaultValue ──────────────────────────────────────────

describe('isNonDefaultValue', () => {
  it('returns false for false', () => {
    expect(isNonDefaultValue(false)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isNonDefaultValue('')).toBe(false);
  });

  it('returns false for 0', () => {
    expect(isNonDefaultValue(0)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isNonDefaultValue(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isNonDefaultValue(undefined)).toBe(false);
  });

  it('returns false for empty array', () => {
    expect(isNonDefaultValue([])).toBe(false);
  });

  it('returns true for non-empty strings', () => {
    expect(isNonDefaultValue('outline')).toBe(true);
  });

  it('returns true for true', () => {
    expect(isNonDefaultValue(true)).toBe(true);
  });

  it('returns true for non-zero numbers', () => {
    expect(isNonDefaultValue(42)).toBe(true);
  });

  it('returns true for objects', () => {
    expect(isNonDefaultValue({ a: 1 })).toBe(true);
  });

  it('returns true for non-empty arrays', () => {
    expect(isNonDefaultValue([1, 2])).toBe(true);
  });
});

// ─── extractTextContent ─────────────────────────────────────────

describe('extractTextContent', () => {
  it('returns string as-is', () => {
    expect(extractTextContent('hello')).toBe('hello');
  });

  it('converts numbers to strings', () => {
    expect(extractTextContent(42)).toBe('42');
  });

  it('returns null for null/undefined', () => {
    expect(extractTextContent(null)).toBeNull();
    expect(extractTextContent(undefined)).toBeNull();
  });

  it('returns null for false, string for true', () => {
    expect(extractTextContent(false)).toBeNull();
    expect(extractTextContent(true)).toBe('true');
  });

  it('joins array of strings', () => {
    expect(extractTextContent(['hello', ' ', 'world'])).toBe('hello world');
  });

  it('joins mixed string/number arrays', () => {
    expect(extractTextContent(['count: ', 42])).toBe('count: 42');
  });

  it('extracts text from Fragment children', () => {
    const frag = createElement(Fragment, null, 'I come in peace ', '✌');
    expect(extractTextContent(frag)).toBe('I come in peace ✌');
  });

  it('extracts text from nested Fragments', () => {
    const inner = createElement(Fragment, null, 'inner');
    const outer = createElement(Fragment, null, 'outer ', inner);
    expect(extractTextContent(outer)).toBe('outer inner');
  });

  it('returns null for named elements', () => {
    const el = createElement('div', null, 'text');
    expect(extractTextContent(el)).toBeNull();
  });

  it('returns null for named components', () => {
    const Component = () => null;
    const el = createElement(Component, null, 'text');
    expect(extractTextContent(el)).toBeNull();
  });

  it('returns null for empty array', () => {
    expect(extractTextContent([])).toBeNull();
  });
});

// ─── serializeChildren ──────────────────────────────────────────

describe('serializeChildren', () => {
  it('returns string as-is', () => {
    expect(serializeChildren('Click me')).toBe('Click me');
  });

  it('wraps numbers in braces', () => {
    expect(serializeChildren(42)).toBe('{42}');
  });

  it('returns null for null/undefined', () => {
    expect(serializeChildren(null)).toBeNull();
    expect(serializeChildren(undefined)).toBeNull();
  });

  it('returns null for false, wraps true', () => {
    expect(serializeChildren(false)).toBeNull();
    expect(serializeChildren(true)).toBe('{true}');
  });

  it('extracts text from Fragment', () => {
    const frag = createElement(Fragment, null, 'I come in peace ', '✌');
    expect(serializeChildren(frag)).toBe('I come in peace ✌');
  });

  it('returns placeholder for non-text elements', () => {
    const el = createElement('div', null, 'content');
    expect(serializeChildren(el)).toBe('{/* content */}');
  });

  it('serializes primitive arrays with JS formatting', () => {
    expect(serializeChildren(['a', 'b'])).toBe('{["a", "b"]}');
    expect(serializeChildren([1, 2])).toBe('{[1, 2]}');
  });

  it('extracts text from mixed array with Fragment', () => {
    const frag = createElement(Fragment, null, 'world');
    expect(serializeChildren(['hello ', frag])).toBe('hello world');
  });

  it('returns placeholder for array with non-text elements', () => {
    const el = createElement('div', null, 'inner');
    expect(serializeChildren([el])).toBe('{/* content */}');
  });
});

// ─── getChangedProps ─────────────────────────────────────────────

describe('getChangedProps', () => {
  it('returns only changed props', () => {
    const args = { size: 'lg', variant: 'solid' };
    const initial = { size: 'md', variant: 'solid' };
    expect(getChangedProps(args, initial)).toEqual({ size: 'lg', variant: 'solid' });
  });

  it('excludes children', () => {
    const args = { children: 'Click me', size: 'lg' };
    const initial = { children: 'Button', size: 'md' };
    expect(getChangedProps(args, initial)).toEqual({ size: 'lg' });
  });

  it('detects deep object changes', () => {
    const args = { style: { color: 'red' } };
    const initial = { style: { color: 'blue' } };
    expect(getChangedProps(args, initial)).toEqual({ style: { color: 'red' } });
  });

  it('includes non-default initial values even when unchanged', () => {
    const args = { legend: 'Contact', helperText: 'We never share' };
    const initial = { legend: 'Contact', helperText: 'We never share' };
    expect(getChangedProps(args, initial)).toEqual({
      legend: 'Contact',
      helperText: 'We never share',
    });
  });

  it('excludes zero/false/empty initial values when unchanged', () => {
    const args = { size: '', count: 0, disabled: false };
    const initial = { size: '', count: 0, disabled: false };
    expect(getChangedProps(args, initial)).toEqual({});
  });

  it('filters hidden argTypes', () => {
    const args = { size: 'lg', internal: 'x' };
    const initial = { size: 'md', internal: 'y' };
    const argTypes = { internal: { table: { disable: true } } };
    expect(getChangedProps(args, initial, argTypes)).toEqual({ size: 'lg' });
  });

  it('excludes function values', () => {
    const args = { onClick: () => {}, size: 'lg' };
    const initial = { size: 'md' };
    expect(getChangedProps(args, initial)).toEqual({ size: 'lg' });
  });
});

// ─── buildPropAttribute ─────────────────────────────────────────

describe('buildPropAttribute', () => {
  it('builds string attribute', () => {
    expect(buildPropAttribute('size', 'lg')).toBe('size="lg"');
  });

  it('builds number attribute', () => {
    expect(buildPropAttribute('count', 5)).toBe('count={5}');
  });

  it('uses shorthand for boolean true', () => {
    expect(buildPropAttribute('loading', true)).toBe('loading');
  });

  it('uses explicit syntax for boolean false', () => {
    expect(buildPropAttribute('disabled', false)).toBe('disabled={false}');
  });

  it('returns null for functions', () => {
    expect(buildPropAttribute('onClick', () => {})).toBeNull();
  });

  it('escapes quotes in string values', () => {
    expect(buildPropAttribute('title', 'say "hello"')).toBe('title="say \\"hello\\""');
  });
});

// ─── generateJsx (integration) ──────────────────────────────────

describe('generateJsx', () => {
  it('renders self-closing tag when nothing changed and no non-default values', () => {
    const result = generateJsx('Button', { size: '' }, { size: '' });
    expect(result).toBe('<Button />');
  });

  it('renders self-closing with inline props (<=2)', () => {
    const result = generateJsx('Button', { size: 'lg' }, { size: 'md' });
    expect(result).toBe('<Button size="lg" />');
  });

  it('renders multiline props (>=3)', () => {
    const args = { size: 'lg', variant: 'outline', loading: true };
    const initial = { size: 'md', variant: 'solid', loading: false };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button\n  size="lg"\n  variant="outline"\n  loading\n/>');
  });

  it('renders children between tags', () => {
    const args = { children: 'Click me' };
    const initial = { children: 'Click me' };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button>Click me</Button>');
  });

  it('renders children with changed props inline', () => {
    const args = { children: 'Submit', size: 'lg' };
    const initial = { children: 'Submit', size: 'md' };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button size="lg">Submit</Button>');
  });

  it('renders non-string children with braces', () => {
    const args = { children: 42 };
    const initial = { children: 42 };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button>{42}</Button>');
  });

  it('filters hidden argTypes', () => {
    const args = { size: 'lg', internal: 'changed' };
    const initial = { size: 'md', internal: 'original' };
    const argTypes = { internal: { table: { disable: true } } };
    const result = generateJsx('Button', args, initial, argTypes);
    expect(result).toBe('<Button size="lg" />');
  });

  it('renders multiline with children (>=3 props)', () => {
    const args = { children: 'Go', size: 'lg', variant: 'outline', loading: true };
    const initial = { children: 'Go', size: 'md', variant: 'solid', loading: false };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button\n  size="lg"\n  variant="outline"\n  loading\n>\n  Go\n</Button>');
  });

  it('shows INITIAL_PROPS on load (Fieldset case)', () => {
    const args = { legend: 'Contact Information', helperText: "We'll never share your info" };
    const initial = { legend: 'Contact Information', helperText: "We'll never share your info" };
    const result = generateJsx('Fieldset', args, initial);
    expect(result).toBe(
      '<Fieldset legend="Contact Information" helperText="We\'ll never share your info" />'
    );
  });

  it('renders Fragment children as text', () => {
    const children = createElement(Fragment, null, 'I come in peace ', '✌');
    const args = { children, variant: 'outline', size: 'md' };
    const initial = { children, variant: 'outline', size: 'md' };
    const result = generateJsx('Card', args, initial);
    expect(result).toBe('<Card variant="outline" size="md">I come in peace ✌</Card>');
  });

  it('renders placeholder for complex element children', () => {
    const children = createElement('div', null, 'complex content');
    const args = { children };
    const initial = { children };
    const result = generateJsx('Card', args, initial);
    expect(result).toBe('<Card>{/* content */}</Card>');
  });

  it('renders self-closing when children serialize to null', () => {
    const args = { children: false };
    const initial = { children: false };
    const result = generateJsx('Button', args, initial);
    expect(result).toBe('<Button />');
  });

  it('escapes quotes in prop values', () => {
    const args = { title: 'say "hello"' };
    const initial = { title: '' };
    const result = generateJsx('Card', args, initial);
    expect(result).toBe('<Card title="say \\"hello\\"" />');
  });

  it('renders RadioGroup with multiline options array', () => {
    const options = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];
    const args = { label: 'Choose a framework', options };
    const initial = { label: 'Choose a framework', options };
    const result = generateJsx('RadioGroup', args, initial);
    expect(result).toBe(
      [
        '<RadioGroup',
        '  label="Choose a framework"',
        '  options={[',
        '    { value: "react", label: "React" },',
        '    { value: "vue", label: "Vue" },',
        '    { value: "angular", label: "Angular" },',
        '    { value: "svelte", label: "Svelte" },',
        '  ]}',
        '/>',
      ].join('\n')
    );
  });

  it('renders Table with multiline columns and data', () => {
    const columns = [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Role', accessorKey: 'role' },
    ];
    const data = [
      { name: 'John', email: 'john@ex.com', role: 'Admin' },
      { name: 'Jane', email: 'jane@ex.com', role: 'User' },
    ];
    const args = { columns, data };
    const initial = { columns, data };
    const result = generateJsx('Table', args, initial);
    expect(result).toBe(
      [
        '<Table',
        '  columns={[',
        '    { header: "Name", accessorKey: "name" },',
        '    { header: "Email", accessorKey: "email" },',
        '    { header: "Role", accessorKey: "role" },',
        '  ]}',
        '  data={[',
        '    { name: "John", email: "john@ex.com", role: "Admin" },',
        '    { name: "Jane", email: "jane@ex.com", role: "User" },',
        '  ]}',
        '/>',
      ].join('\n')
    );
  });

  it('forces multiline format when <=2 props but one is multiline', () => {
    const options = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ];
    const args = { options };
    const initial = { options };
    const result = generateJsx('Select', args, initial);
    expect(result).toContain('<Select\n');
    expect(result).toContain('options={[\n');
  });

  it('renders Menu items with React element icons', () => {
    const LuPencil = () => null;
    LuPencil.displayName = 'LuPencil';
    const LuTrash = () => null;
    LuTrash.displayName = 'LuTrash';

    const items = [
      { value: 'edit', label: 'Edit', icon: createElement(LuPencil) },
      { value: 'delete', label: 'Delete', icon: createElement(LuTrash) },
    ];
    const args = { items };
    const initial = { items };
    const result = generateJsx('Menu', args, initial);
    expect(result).toBe(
      [
        '<Menu',
        '  items={[',
        '    { value: "edit", label: "Edit", icon: <LuPencil /> },',
        '    { value: "delete", label: "Delete", icon: <LuTrash /> },',
        '  ]}',
        '/>',
      ].join('\n')
    );
  });
});

// ─── formatReactElement ─────────────────────────────────────────

describe('formatReactElement', () => {
  it('returns tag name for named components', () => {
    const Component = () => null;
    Component.displayName = 'MyIcon';
    expect(formatReactElement(createElement(Component))).toBe('<MyIcon />');
  });

  it('returns tag name for HTML elements', () => {
    expect(formatReactElement(createElement('div'))).toBe('<div />');
  });

  it('uses function name when no displayName', () => {
    function LuStar() {
      return null;
    }
    expect(formatReactElement(createElement(LuStar))).toBe('<LuStar />');
  });

  it('returns fallback for anonymous components', () => {
    expect(formatReactElement(createElement(() => null))).toBe('{/* element */}');
  });
});

// ─── indentBlock ────────────────────────────────────────────────

describe('indentBlock', () => {
  it('indents a single line', () => {
    expect(indentBlock('hello', 2)).toBe('  hello');
  });

  it('indents all lines of multi-line string', () => {
    expect(indentBlock('a\nb\nc', 4)).toBe('    a\n    b\n    c');
  });

  it('handles zero indent', () => {
    expect(indentBlock('hello', 0)).toBe('hello');
  });
});

// ─── formatJsValue ──────────────────────────────────────────────

describe('formatJsValue', () => {
  it('formats primitives', () => {
    expect(formatJsValue(null)).toBe('null');
    expect(formatJsValue(undefined)).toBe('undefined');
    expect(formatJsValue('hello')).toBe('"hello"');
    expect(formatJsValue(42)).toBe('42');
    expect(formatJsValue(true)).toBe('true');
    expect(formatJsValue(false)).toBe('false');
  });

  it('formats empty arrays', () => {
    expect(formatJsValue([])).toBe('[]');
  });

  it('formats short arrays inline', () => {
    expect(formatJsValue([1, 2, 3])).toBe('[1, 2, 3]');
    expect(formatJsValue(['a', 'b'])).toBe('["a", "b"]');
  });

  it('formats long arrays multiline', () => {
    const items = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ];
    const result = formatJsValue(items);
    expect(result).toBe(
      [
        '[',
        '  { value: "react", label: "React" },',
        '  { value: "vue", label: "Vue" },',
        '  { value: "angular", label: "Angular" },',
        ']',
      ].join('\n')
    );
  });

  it('formats empty objects', () => {
    expect(formatJsValue({})).toBe('{}');
  });

  it('formats short objects inline', () => {
    expect(formatJsValue({ a: 1, b: 2 })).toBe('{ a: 1, b: 2 }');
  });

  it('formats long objects multiline', () => {
    const obj = { name: 'John Doe', email: 'john@example.com', role: 'Administrator' };
    const result = formatJsValue(obj);
    expect(result).toBe(
      [
        '{',
        '  name: "John Doe",',
        '  email: "john@example.com",',
        '  role: "Administrator",',
        '}',
      ].join('\n')
    );
  });

  it('formats React elements as JSX tags', () => {
    const LuPencil = () => null;
    LuPencil.displayName = 'LuPencil';
    expect(formatJsValue(createElement(LuPencil))).toBe('<LuPencil />');
  });

  it('formats functions as () => {}', () => {
    expect(formatJsValue(() => {})).toBe('() => {}');
  });

  it('filters undefined object values', () => {
    expect(formatJsValue({ a: 1, b: undefined })).toBe('{ a: 1 }');
  });

  it('handles nested structures', () => {
    const items = [
      { value: 'edit', label: 'Edit' },
      { value: 'delete', label: 'Delete' },
    ];
    const result = formatJsValue(items);
    expect(result).toBe(
      [
        '[',
        '  { value: "edit", label: "Edit" },',
        '  { value: "delete", label: "Delete" },',
        ']',
      ].join('\n')
    );
  });
});
