import { Chart } from 'chart.js';

// @ts-expect-error TS2339: Property 'Chart' does not exist on type 'Window & typeof globalThis'.
window.Chart = Chart;

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
import 'jest-canvas-mock';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
