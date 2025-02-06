const { defineConfig } = require('@playwright/test');
require('dotenv').config({ path: '.env.test' });

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: 'list',
  use: {
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    baseURL: process.env.API_URL || 'http://localhost:3000',
  },
  projects: [
    {
      name: 'api',
      use: {
        browserName: undefined,
      },
    },
  ],
}); 