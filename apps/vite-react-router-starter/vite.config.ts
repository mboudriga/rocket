import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 3003 },
  resolve: { tsconfigPaths: true },
  plugins: [reactRouter()],
});
