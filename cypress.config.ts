import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    viewportWidth: 1440,
    viewportHeight: 900,
    chromeWebSecurity: false,
    videosFolder: "../dist/cypress/ng2-charts-e2e/videos",
    screenshotsFolder: "../dist/cypress/ng2-charts-e2e/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      addMatchImageSnapshotPlugin(on, config);
    },
  },
});
