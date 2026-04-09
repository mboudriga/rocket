import { create } from 'storybook/theming/create';

export default create({
  base: 'light',

  // Brand
  brandTitle: ' ',
  brandUrl: 'https://github.com/mboudriga/rocket',
  brandImage: '/favicon.svg',
  brandTarget: '_self',

  // Primary colors
  colorPrimary: '#d03042',
  colorSecondary: '#d03042',

  // UI backgrounds
  appBg: '#f3f2f0',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#d4d1cd',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',

  // Text
  textColor: '#1c1b1a',
  textInverseColor: '#faf9f8',
  textMutedColor: '#5c5955',

  // Toolbar
  barTextColor: '#5c5955',
  barSelectedColor: '#d03042',
  barHoverColor: '#9a1a2a',
  barBg: '#faf9f8',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#d4d1cd',
  inputTextColor: '#1c1b1a',
  inputBorderRadius: 6,
});
