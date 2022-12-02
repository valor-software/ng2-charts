import { defineConfig } from "cypress";
import { initPlugin } from "@frsource/cypress-plugin-visual-regression-diff/plugins";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    chromeWebSecurity: false,
    videosFolder: "../dist/cypress/ng2-charts-e2e/videos",
    screenshotsFolder: "../dist/cypress/ng2-charts-e2e/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config);
    },
  }
});
