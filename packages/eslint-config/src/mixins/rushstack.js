const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  plugins: ["@rushstack/eslint-plugin"],
  rules: {
    // RATIONALE:         See the @rushstack/eslint-plugin documentation
    "@rushstack/no-new-null": "warn",

    // RATIONALE:         See the @rushstack/eslint-plugin documentation
    //                    This is enabled and classified as an error because it is required when using Heft.
    //                    It's not required when using ts-jest, but still a good practice.
    "@rushstack/hoist-jest-mock": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // RATIONALE:         See the @rushstack/eslint-plugin documentation
        "@rushstack/typedef-var": "warn",
      },
    },
  ],
});
