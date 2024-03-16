const { tests } = require("../constants");
const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  env: {
    jest: true,
  },
  overrides: [
    {
      files: tests,
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: {
        // Disable this rules because sometimes we will testing with any type
        "@typescript-eslint/no-explicit-any": "off",
        // Disable this rules because sometimes we will testing with undefined
        "unicorn/no-useless-undefined": "off",
        // Disable null on test because sometimes we will testing on null value
        "unicorn/no-null": "off",
        // This is when using jest.mock must come before import statement
        "import/first": "off",
      },
      settings: {
        jest: {
          // NOTE: Normally this should always be latest major version
          // ref: https://github.com/microsoft/rushstack/blob/main/heft-plugins/heft-jest-plugin/package.json
          version: 29,
        },
      },
    },
  ],
});
