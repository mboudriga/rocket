import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3008,
    strictPort: true,
    host: true,
  },
  plugins: [react(), tsconfigPaths()],
});
