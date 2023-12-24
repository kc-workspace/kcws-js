const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  env: {
    jest: true,
  },
  overrides: [
    {
      files: [
        // Test files
        "*.test.ts",
        "*.test.tsx",
        "*.test.js",
        "*.test.jsx",
        "*.spec.ts",
        "*.spec.tsx",
        "*.spec.js",
        "*.spec.jsx",

        // Facebook convention
        "**/__mocks__/*.ts",
        "**/__mocks__/*.tsx",
        "**/__mocks__/*.js",
        "**/__mocks__/*.jsx",
        "**/__tests__/*.ts",
        "**/__tests__/*.tsx",
        "**/__tests__/*.js",
        "**/__tests__/*.jsx",

        // Microsoft convention
        "**/test/*.ts",
        "**/test/*.tsx",
        "**/test/*.js",
        "**/test/*.jsx",
      ],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: {
        // Disable this rules because sometimes we will testing with undefined
        "unicorn/no-useless-undefined": "off",
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
