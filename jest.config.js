// FROM: https://basarat.gitbooks.io/typescript/docs/testing/jest.html

module.exports = {
  roots: [
    '<rootDir>/src', // We always recommend having all TypeScript files in a src folder in your project. We assume this is true and specify this using the roots option.
  ],
  transform: { // The transform config just tells jest to use ts-jest for ts / tsx files.
    '^.+\\.tsx?$': 'ts-jest',
  },
  // The testRegex tells Jest to look for tests in any files which contains ".test.ts or .test.tsx"
  testRegex: '\.test\.(ts|tsx)$',
  // The moduleFileExtensions tells jest to recognize our file extensions. This is needed as we add ts/tsx into the defaults (js|jsx|json|node).
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.(css|html|png)$': '<rootDir>/src/tests/empty-module.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      diagostics: false,
    },
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**main.js',
    '!**/tests/**',
  ],
  coverageDirectory: '_coverage',
};
