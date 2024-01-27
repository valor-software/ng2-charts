import { defineConfig, devices } from "@playwright/test";
import { nxE2EPreset } from "@nx/playwright/preset";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { workspaceRoot } from "@nx/devkit";

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env["BASE_URL"] || "http://localhost:4200";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: "./e2e" }),
  projects: [{
    name: "chromium",
    use: { ...devices["Desktop Chrome"] }
  }],
  webServer: {
    command: "npm run serve-static",
    url: baseURL,
    reuseExistingServer: !process.env.CI
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry"
  }
});
