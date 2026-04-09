import type { ThemeRegistration } from 'shiki';

export const rocketCodeDark: ThemeRegistration = {
  name: 'rocket-code-dark',
  type: 'dark',
  colors: {
    'editor.background': '#1e1d1c',
    'editor.foreground': '#e8e5e1',
    'editorLineNumber.foreground': '#5c5955',
    'editorLineNumber.activeForeground': '#a8a4a0',
  },
  tokenColors: [
    { settings: { foreground: '#e8e5e1', background: '#1e1d1c' } },
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#6b6763', fontStyle: 'italic' },
    },
    {
      name: 'Strings',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#D3AF37' },
    },
    {
      name: 'Keywords',
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'keyword.operator.logical',
        'variable.language.this',
        'variable.language.super',
      ],
      settings: { foreground: '#ed4757' },
    },
    {
      name: 'Functions',
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call entity.name.function',
      ],
      settings: { foreground: '#e8a56c' },
    },
    {
      name: 'Types and Classes',
      scope: [
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'entity.other.inherited-class',
      ],
      settings: { foreground: '#d0936e' },
    },
    {
      name: 'Constants and Numbers',
      scope: [
        'constant',
        'constant.numeric',
        'constant.language',
        'support.constant',
        'variable.other.constant',
      ],
      settings: { foreground: '#c9a0dc' },
    },
    {
      name: 'Tags (JSX/HTML)',
      scope: ['entity.name.tag', 'punctuation.definition.tag', 'support.class.component'],
      settings: { foreground: '#ed4757' },
    },
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#e8a56c' },
    },
    {
      name: 'Operators',
      scope: ['keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#a8a4a0' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
      settings: { foreground: '#8a8580' },
    },
    {
      name: 'Properties',
      scope: [
        'variable.other.property',
        'variable.other.object.property',
        'support.variable.property',
        'meta.object-literal.key',
      ],
      settings: { foreground: '#c4bfb9' },
    },
    {
      name: 'Variables',
      scope: ['variable', 'variable.other.readwrite'],
      settings: { foreground: '#e8e5e1' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#7ec89f' },
    },
    {
      name: 'Template expressions',
      scope: ['punctuation.definition.template-expression', 'punctuation.section.embedded'],
      settings: { foreground: '#ed4757' },
    },
    {
      name: 'Import/Export',
      scope: ['keyword.control.import', 'keyword.control.export', 'keyword.control.from'],
      settings: { foreground: '#ed4757' },
    },
    {
      name: 'Decorators',
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: '#e8a56c' },
    },
  ],
};
