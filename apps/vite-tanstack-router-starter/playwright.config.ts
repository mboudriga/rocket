import { createBaseConfig } from '@engine/playwright-config';

export default createBaseConfig({
  baseURL: 'http://localhost:3002',
  testDir: './e2e',
  webServerCommand: 'pnpm dev',
  hasAuthSetup: true,
  authStoragePath: '.auth/user.json',
});
