import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    viewportWidth: 1000,
    chromeWebSecurity: false,
    videosFolder: '../../dist/cypress/videos',
    screenshotsFolder: '../../dist/cypress/screenshots',
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      // implement node event listeners here
      initPlugin(on, config);

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200 on non-retina screens
          // and 2800x2400 on retina screens
          launchOptions.args.push('--window-size=1000,1000')

          // force screen to be non-retina (1400x1200 size)
          launchOptions.args.push('--force-device-scale-factor=1')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200
          launchOptions.preferences['width'] = 1000
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          // menubars take up height on the screen
          // so fullPage screenshot size is 1400x1126
          launchOptions.args.push('--width=1000')
        }

        return launchOptions
      })
    },
  }
});
