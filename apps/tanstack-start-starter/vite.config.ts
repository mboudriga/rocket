import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isTest = process.env.VITEST === 'true';

export default defineConfig({
  server: { port: 3001 },
  resolve: { tsconfigPaths: true },
  plugins: [!isTest && tanstackStart(), react()],
});
