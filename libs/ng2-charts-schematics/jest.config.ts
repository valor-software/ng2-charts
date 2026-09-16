/* eslint-disable */
const esmPackages = ['parse5', 'entities'].join('|');
const babelTransform = [
  'babel-jest',
  { presets: [['@babel/preset-env', { targets: { node: 'current' } }]] },
];
export default {
  displayName: 'ng2-charts-schematics',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    [`node_modules[\\\\/](${esmPackages})[\\\\/].+\\.js$`]: babelTransform,
    '^.+\\.mjs$': babelTransform,
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  transformIgnorePatterns: [`node_modules/(?!(${esmPackages})/|.*\\.mjs$)`],
  moduleNameMapper: {
    '^ora$': '<rootDir>/test/ora.stub.ts',
  },
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  coverageDirectory: '../../coverage/libs/ng2-charts-schematics',
};
