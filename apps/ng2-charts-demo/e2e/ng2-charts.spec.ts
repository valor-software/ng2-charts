import { test, expect } from '@playwright/test';

test(`navigate to main Demo page and check info`, async ({ page }) => {
  const topBarSelector = 'mat-toolbar';
  const mainContentSelector = 'main';
  await page.goto('/');

  // wait for animations to finish
  await expect(page.locator(topBarSelector)).toBeVisible();

  await expect(page.locator(topBarSelector)).toHaveScreenshot();

  return expect(page.locator(mainContentSelector)).toBeVisible();
});

const componentsArray = [
  { url: '/line', selector: 'app-line-chart' },
  { url: '/bar', selector: 'app-bar-chart' },
  { url: '/doughnut', selector: 'app-doughnut-chart' },
  { url: '/radar', selector: 'app-radar-chart' },
  { url: '/pie', selector: 'app-pie-chart' },
  { url: '/polar-area', selector: 'app-polar-area-chart' },
  { url: '/bubble', selector: 'app-bubble-chart' },
  { url: '/scatter', selector: 'app-scatter-chart' },
  { url: '/dynamic', selector: 'app-dynamic-chart' },
  { url: '/financial', selector: 'app-financial-chart' },
];

componentsArray.forEach((component) => {
  test(`${component.selector}`, async ({ page }) => {
    await page.goto(component.url);
    // wait for animations to finish
    await expect(page.locator(component.selector + ' canvas')).toBeVisible();

    return expect(
      page.locator(component.selector + ' canvas'),
    ).toHaveScreenshot();
  });
});
