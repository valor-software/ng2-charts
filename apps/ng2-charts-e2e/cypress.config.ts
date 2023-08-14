import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins';

export default defineConfig({
  e2e: {
    viewportWidth: 1000,
    ...nxE2EPreset(__dirname),
    chromeWebSecurity: false,
    videosFolder: '../../dist/cypress/videos',
    screenshotsFolder: '../../dist/cypress/screenshots',
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      // implement node event listeners here
      initPlugin(on, config);
    },
  }
});
