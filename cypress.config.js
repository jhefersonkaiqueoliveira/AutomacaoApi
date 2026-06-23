import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  env: {
    apiToken: process.env.CYPRESS_apiToken ?? 'token-valido',
  },
  e2e: {
    baseUrl: 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
  requestTimeout: 5000,
  responseTimeout: 5000,
});
