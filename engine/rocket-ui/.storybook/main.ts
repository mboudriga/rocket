import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  staticDirs: ['public'],

  core: {
    disableTelemetry: true,
  },

  tags: ['autodocs'],

  features: {
    sidebarOnboardingChecklist: false,
    interactions: false,
  },

  /** Tell storybook where to look for files */
  stories: [
    './documentation/**/*.story.@(ts|tsx)',
    '../src/components/**/*.story.@(ts|tsx)',
    './widgets/*.story.@(ts|tsx)',
  ],

  /** Use the typescript docgen to load component props */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  /** Storybook detects chakra and displays stories for their components which can be
   * confusing. We have the Chakra UI docs widget so we don't need this feature. */
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },

  /** The load order determines the order they appear in the panels
   * https://storybook.js.org/integrations */
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    '@vueless/storybook-dark-mode',
  ],

  /** Register the inlined vitest panel addon */
  managerEntries: [join(process.cwd(), '.storybook/addons/vitest-panel/manager.tsx')],

  viteFinal: async (config) => {
    const { resolve } = await import('node:path');
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Inject sourceCode prop into ExampleSection children at build time
    const { default: exampleSourcePlugin } = await import('./plugins/vite-plugin-example-source');
    // Resolve DefaultProps references in docgen output (e.g., "ButtonDefaultProps.variant" → "solid")
    const { default: resolveDefaultPropsPlugin } = await import('./plugins/vite-plugin-resolve-default-props');

    config.plugins = config.plugins || [];
    config.plugins.push(exampleSourcePlugin());
    config.plugins.push(resolveDefaultPropsPlugin());

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolve(__dirname, '../src/components'),
      '@storybook-themes': resolve(__dirname, 'themes'),
    };
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
