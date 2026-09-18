import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './qa/regression',
  outputDir: './qa/browser-results',
  use: { baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }, { name: 'webkit', use: { browserName: 'webkit' } }],
});
