import { createBaseConfig } from '@engine/playwright-config';

export default createBaseConfig({
  baseURL: 'http://localhost:3004',
  testDir: './e2e',
  webServerCommand: 'pnpm dev',
});
