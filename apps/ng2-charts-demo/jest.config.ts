/* eslint-disable */
import * as fin from 'chartjs-chart-financial';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fin = require('chartjs-chart-financial');
console.log(fin);

const esModules = [
  '@angular',
  'lodash-es',
  'chart.js',
  'chartjs-chart-financial',
].join('|');
export default {
  displayName: 'ng2-charts',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ng2-charts',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [`node_modules/(?!.*\\.mjs$|${esModules})`],
  moduleNameMapper: {
    '^!!raw-loader!.*': 'jest-raw-loader',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
