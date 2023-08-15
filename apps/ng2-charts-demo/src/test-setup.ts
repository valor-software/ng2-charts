// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))


// @ts-expect-error TS2339: Property 'Chart' does not exist on type 'Window & typeof global'.
global.Chart = {
  plugins: []
};

import 'jest-preset-angular/setup-jest';
import 'jest-canvas-mock';
