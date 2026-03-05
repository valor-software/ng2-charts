const esModules = ['lodash-es', 'marked', 'ngx-markdown'].join('|');
export default {
  displayName: 'ng2-charts',
  preset: '../../jest.preset.js',
  roots: ['./src'],
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
    '.*\\.txt': 'jest-raw-loader',
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
    '^@angular/router$':
      '<rootDir>/../../node_modules/@angular/router/fesm2022/router.mjs',
    '^@angular/router/testing$':
      '<rootDir>/../../node_modules/@angular/router/fesm2022/testing.mjs',
    '^@angular/material/(.+)$':
      '<rootDir>/../../node_modules/@angular/material/fesm2022/$1.mjs',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
