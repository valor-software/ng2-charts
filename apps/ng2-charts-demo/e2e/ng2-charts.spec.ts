import { test, expect } from "@playwright/test";

test(`navigate to main Demo page and check info`, async ({ page }) => {
  const topBarSelector = "mat-toolbar";
  const mainContentSelector = "main";
  await page.goto("/");

  // wait for animations to finish
  await expect(page.locator(topBarSelector)).toBeVisible();

  await expect(page.locator(topBarSelector)).toHaveScreenshot();

  return expect(page.locator(mainContentSelector)).toBeVisible();
});

const componentsArray = [
  { url: "/#LineChart", selector: "app-line-chart" },
  { url: "/#BarChart", selector: "app-bar-chart" },
  { url: "/#DoughnutChart", selector: "app-doughnut-chart" },
  { url: "/#RadarChart", selector: "app-radar-chart" },
  { url: "/#PieChart", selector: "app-pie-chart" },
  { url: "/#PolarAreaChart", selector: "app-polar-area-chart" },
  { url: "/#BubbleChart", selector: "app-bubble-chart" },
  { url: "/#ScatterChart", selector: "app-scatter-chart" },
  { url: "/#DynamicChart", selector: "app-dynamic-chart" }
];

componentsArray.forEach((component) => {
  test(`${component.selector}`, async ({ page }) => {
    await page.goto(component.url);
    // wait for animations to finish
    await expect(page.locator(component.selector)
      .locator("canvas"))
      .toBeVisible();

    return expect(page.locator(component.selector).locator("canvas")).toHaveScreenshot();
  });
});
