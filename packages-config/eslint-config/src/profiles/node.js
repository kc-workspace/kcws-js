const { mergeConfig } = require("../utils/config");
const common = require("./common");

module.exports = mergeConfig(common, {
  plugins: ["eslint-plugin-n"],
  extends: ["plugin:n/recommended"],
  env: {
    node: true,
  },
  rules: {
    // Already supported on eslint-plugin-import-x
    "n/no-missing-import": "off",
    "n/no-unpublished-import": ["error", { ignoreTypeImport: true }],
  },
});
