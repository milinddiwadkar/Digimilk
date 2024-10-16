import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'digimilk',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    webContentsDebuggingEnabled: true,
    allowMixedContent: true, // Allows HTTP content in HTTPS pages
  },
  plugins: {
    CapacitorCookies: {
      enabled: true
    },
    CapacitorHttp: {
      enabled: true, // Enable HTTP plugin to manage CORS and credentials
    },
  }
};
export default config;