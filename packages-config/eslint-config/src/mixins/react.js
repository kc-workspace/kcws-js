const { defineConfig } = require("../utils/config");

// NOTE: Never tested before
module.exports = defineConfig({
  plugins: ["eslint-plugin-react"],
  extends: ["plugin:react/recommended"],
});
