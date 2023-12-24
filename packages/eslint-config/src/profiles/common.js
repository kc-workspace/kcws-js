const { defineConfig, mergePlugins } = require("../utils/config");

module.exports = defineConfig({
  plugins: mergePlugins(
    "@rushstack/eslint-plugin-security",
    "eslint-plugin-unicorn",
    "eslint-plugin-deprecation",
    "eslint-plugin-import",
    "eslint-plugin-promise"
  ),
  extends: ["plugin:eslint-plugin-unicorn/recommended"],
  rules: {
    "@rushstack/security/no-unsafe-regexp": "warn",

    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
  },
});
