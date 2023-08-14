import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    viewportHeight: 400,
    viewportWidth: 800,
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
  },
  env: {
    pluginVisualRegressionDiffConfig: { includeAA: false },
  },
});
