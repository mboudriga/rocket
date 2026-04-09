import { createBaseConfig } from '@engine/playwright-config';

export default createBaseConfig({
  baseURL: 'http://localhost:3005',
  testDir: './e2e',
  webServerCommand: 'pnpm dev',
});
