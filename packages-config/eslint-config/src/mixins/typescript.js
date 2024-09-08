const { typescripts, dts, javascripts, lang } = require("../constants");
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
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        // Disable this when using with typescript
        // ref: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        "n/no-unsupported-features/es-syntax": "off",

        // TypeScript compilation already ensures that named imports exist in the referenced module
        "import-x/named": "off",
        "import-x/no-deprecated": "warn",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "after-used",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
          },
        ],
      },
      settings: {
        "import-x/extensions": lang(typescripts, javascripts),
        "import-x/external-module-folders": [
          "node_modules",
          "node_modules/@types",
        ],
        "import-x/resolver": {
          [require.resolve("eslint-import-resolver-typescript")]: true,
          [require.resolve("eslint-import-resolver-node")]: true,
        },
      },
    },
    {
      files: javascripts,
      extends: ["plugin:@typescript-eslint/base"],
      rules: {
        "import-x/no-deprecated": "warn",
      },
    },
  ],
});
