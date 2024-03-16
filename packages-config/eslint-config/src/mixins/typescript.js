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

        // TypeScript compilation already ensures that named imports exist in the referenced module
        "import/named": "off",

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
        "import/extensions": lang(typescripts, javascripts),
        "import/external-module-folders": [
          "node_modules",
          "node_modules/@types",
        ],
        "import/resolver": {
          [require.resolve("eslint-import-resolver-typescript")]: true,
          [require.resolve("eslint-import-resolver-node")]: true,
        },
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
