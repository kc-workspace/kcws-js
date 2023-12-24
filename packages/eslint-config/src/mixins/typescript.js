const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["*.d.ts"],
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        // Disable this when using with typescript
        // ref: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        "n/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
});
