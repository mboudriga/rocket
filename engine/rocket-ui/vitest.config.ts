import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
    },
  },
  test: {
    // Critical settings
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],

    // Pool - threads allows testTimeout to interrupt hangs on Windows
    pool: 'threads',

    // Timeouts
    testTimeout: 15000,
    hookTimeout: 15000,
    teardownTimeout: 30000,

    // Cleanup
    clearMocks: true,
    restoreMocks: true,

    // Patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}', '.storybook/**/*.{test,spec}.{ts,tsx}'],
    exclude: [],
    passWithNoTests: true,

    // Reporters (enable hanging-process when debugging)
    // JSON reporter feeds vitest-results.json → Storybook vitest panel
    reporters: process.env.DEBUG_VITEST
      ? ['default', 'hanging-process', 'json']
      : [['default', { summary: false }], 'json'],

    // Output file for JSON reporter (consumed by Storybook vitest panel)
    outputFile: {
      json: './vitest-results.json',
    },

    // Console log filtering — suppress known library noise
    // Note: jsdom "Not implemented" and CSS parse warnings are suppressed
    // at the process.stderr level in setup.ts (they bypass console.*)
    onConsoleLog(log) {
      if (log.includes('was not wrapped in act(')) return false;
      if (log.includes('[@zag-js/dismissable]')) return false;
      if (log.includes('kebab-case for css properties')) return false;
      return undefined;
    },

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/*.story.tsx',
        'src/**/*.stories.tsx',
        'src/**/*.examples.tsx',
        'src/test/**',
        '**/index.ts',
        'src/types/**',
        'src/constants/**',
        'src/fonts/**',
        'src/components/Typography/RichTextEditor/controls/**',
        'src/components/Typography/RichTextEditor/hooks/**',
      ],
    },
  },
});
