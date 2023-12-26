const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  plugins: ["@typescript-eslint/eslint-plugin", "eslint-plugin-deprecation"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    // Only enabled if typescript is enabled
    "plugin:eslint-plugin-deprecation/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["*.d.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      rules: {
        // Disable this when using with typescript
        // ref: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        "n/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
});
