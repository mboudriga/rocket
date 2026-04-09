import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.capacitormobilestarter',
  appName: 'Capacitor Mobile Starter',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
