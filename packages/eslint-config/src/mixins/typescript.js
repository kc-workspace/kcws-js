const { typescripts, dts, javascripts } = require("../constants");
const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: typescripts,
      excludedFiles: dts,
      plugins: [
        "@typescript-eslint/eslint-plugin",
        "eslint-plugin-deprecation",
      ],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-plugin-deprecation/recommended",
      ],
      rules: {
        // Disable this when using with typescript
        // ref: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        "n/no-unsupported-features/es-syntax": "off",
      },
    },
    {
      files: javascripts,
      extends: [
        "plugin:@typescript-eslint/base",
        "plugin:eslint-plugin-deprecation/recommended",
      ],
    },
  ],
});
