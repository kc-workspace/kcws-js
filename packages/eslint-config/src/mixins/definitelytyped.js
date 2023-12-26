const { dts } = require("../constants");
const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  overrides: [
    {
      files: dts,
      plugins: ["@definitelytyped/eslint-plugin"],
      extends: ["plugin:@definitelytyped/all"],
    },
  ],
});
