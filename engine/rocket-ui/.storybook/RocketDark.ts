import { create } from 'storybook/theming/create';

export default create({
  base: 'dark',

  // Brand
  brandTitle: ' ',
  brandUrl: 'https://github.com/mboudriga/rocket',
  brandImage: '/favicon.svg',
  brandTarget: '_self',

  // Primary colors
  colorPrimary: '#ed4757',
  colorSecondary: '#ed4757',

  // UI backgrounds
  appBg: '#1c1b1a',
  appContentBg: '#252322',
  appPreviewBg: '#1c1b1a',
  appBorderColor: '#454240',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',

  // Text
  textColor: '#faf9f8',
  textInverseColor: '#1c1b1a',
  textMutedColor: '#a8a4a0',

  // Toolbar
  barTextColor: '#a8a4a0',
  barSelectedColor: '#ed4757',
  barHoverColor: '#f15a6a',
  barBg: '#252322',

  // Inputs
  inputBg: '#2e2c2b',
  inputBorder: '#454240',
  inputTextColor: '#faf9f8',
  inputBorderRadius: 6,
});
