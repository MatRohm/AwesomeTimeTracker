// FROM: https://basarat.gitbooks.io/typescript/docs/testing/jest.html 

module.exports = {
  "roots": [
    "<rootDir>/src" // We always recommend having all TypeScript files in a src folder in your project. We assume this is true and specify this using the roots option.
  ],
  "transform": { // The transform config just tells jest to use ts-jest for ts / tsx files.
    "^.+\\.tsx?$": "ts-jest"
  },
  // The testRegex tells Jest to look for tests in any __tests__ folder AND also any files anywhere that use the (.test|.spec).(ts|tsx) extension e.g. asdf.test.tsx etc.
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$",
  // The moduleFileExtensions tells jest to recognize our file extensions. This is needed as we add ts/tsx into the defaults (js|jsx|json|node).
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}