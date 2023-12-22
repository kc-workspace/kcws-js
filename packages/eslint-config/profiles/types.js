const defineConfig = require("./common");

module.exports = defineConfig(undefined, {
  extends: ["plugin:@definitelytyped/eslint-plugin/all"],
  plugins: ["@definitelytyped/eslint-plugin"],
  rules: {
    "@typescript-eslint/array-type": "off",
  },
});
