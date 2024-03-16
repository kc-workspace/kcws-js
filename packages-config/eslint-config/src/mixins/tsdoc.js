const { dts, typescripts } = require("../constants");
const { defineConfig } = require("../utils/config");

module.exports = defineConfig({
  overrides: [
    {
      files: typescripts,
      excludedFiles: dts,
      plugins: ["eslint-plugin-tsdoc"],
      rules: {
        "tsdoc/syntax": "warn",
      },
    },
  ],
});
