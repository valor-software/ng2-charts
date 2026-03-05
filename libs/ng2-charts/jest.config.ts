/* eslint-disable */
const esModules = ['lodash-es'].join('|');
export default {
  displayName: 'ng2-charts',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/ng2-charts',
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
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleNameMapper: {
    '^@angular/core/testing$':
      '<rootDir>/../../node_modules/@angular/core/fesm2022/testing.mjs',
    '^@angular/common/testing$':
      '<rootDir>/../../node_modules/@angular/common/fesm2022/testing.mjs',
    '^@angular/common/http$':
      '<rootDir>/../../node_modules/@angular/common/fesm2022/http.mjs',
    '^@angular/common/http/testing$':
      '<rootDir>/../../node_modules/@angular/common/fesm2022/http-testing.mjs',
    '^@angular/platform-browser/testing$':
      '<rootDir>/../../node_modules/@angular/platform-browser/fesm2022/testing.mjs',
    '^@angular/platform-browser/animations$':
      '<rootDir>/../../node_modules/@angular/platform-browser/fesm2022/animations.mjs',
  },
};
