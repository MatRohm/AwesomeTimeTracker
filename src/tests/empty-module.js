// FROM: https://diessi.ca/blog/how-to-exclude-css-images-anything-from-unit-tests/
// this is for JEST, as it wants to load every import a file made, even HTML or CSS
// in jest.config.js points to this file in order to replace the exports.
module.exports = '';
