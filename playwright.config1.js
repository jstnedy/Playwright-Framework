// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
   workers: 5,
  timeout: 90000,
  expect: {
    timeout: 90000,
  },
  reporter: [['html', { open: 'always' }]], // ✅ top-level reporter
  

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        // ...devices['iPhone 11'],
      },
    },
  ],
});
