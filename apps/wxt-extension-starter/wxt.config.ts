import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: '.',
  alias: {
    '@components': '../../engine/rocket-ui/src/components',
  },
  manifest: {
    name: 'WXT Extension Starter',
    description: 'A starter browser extension built with WXT, React, and Rocket UI',
    permissions: ['storage', 'activeTab', 'contextMenus', 'alarms'],
  },
  dev: {
    server: {
      port: 3007,
    },
  },
});
