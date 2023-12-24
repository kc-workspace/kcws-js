const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  overrides: [
    {
      files: ["*.d.ts"],
      plugins: ["@definitelytyped/eslint-plugin"],
      extends: ["plugin:@definitelytyped/all"],
    },
  ],
});
