import type { ThemeRegistration } from 'shiki';

export const rocketCodeLight: ThemeRegistration = {
  name: 'rocket-code-light',
  type: 'light',
  colors: {
    'editor.background': '#faf9f8',
    'editor.foreground': '#2b2926',
    'editorLineNumber.foreground': '#756f6a',
    'editorLineNumber.activeForeground': '#5c5955',
  },
  tokenColors: [
    { settings: { foreground: '#2b2926', background: '#faf9f8' } },
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#756f6a', fontStyle: 'italic' },
    },
    {
      name: 'Strings',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#7a6410' },
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
      settings: { foreground: '#d03042' },
    },
    {
      name: 'Functions',
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call entity.name.function',
      ],
      settings: { foreground: '#96612f' },
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
      settings: { foreground: '#a0623e' },
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
      settings: { foreground: '#7b5496' },
    },
    {
      name: 'Tags (JSX/HTML)',
      scope: ['entity.name.tag', 'punctuation.definition.tag', 'support.class.component'],
      settings: { foreground: '#d03042' },
    },
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#96612f' },
    },
    {
      name: 'Operators',
      scope: ['keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#5c5955' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'],
      settings: { foreground: '#6e6963' },
    },
    {
      name: 'Properties',
      scope: [
        'variable.other.property',
        'variable.other.object.property',
        'support.variable.property',
        'meta.object-literal.key',
      ],
      settings: { foreground: '#5c5955' },
    },
    {
      name: 'Variables',
      scope: ['variable', 'variable.other.readwrite'],
      settings: { foreground: '#2b2926' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#2d7a52' },
    },
    {
      name: 'Template expressions',
      scope: ['punctuation.definition.template-expression', 'punctuation.section.embedded'],
      settings: { foreground: '#d03042' },
    },
    {
      name: 'Import/Export',
      scope: ['keyword.control.import', 'keyword.control.export', 'keyword.control.from'],
      settings: { foreground: '#d03042' },
    },
    {
      name: 'Decorators',
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: '#96612f' },
    },
  ],
};
