import { defineConfig } from "cypress";
import { initPlugin } from "@frsource/cypress-plugin-visual-regression-diff/plugins";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    chromeWebSecurity: false,
    videosFolder: "dist/cypress/videos",
    screenshotsFolder: "dist/cypress/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config);
    },
  },
  env: {
    pluginVisualRegressionDiffConfig: { threshold: 0.1, includeAA: false },
  },
});
