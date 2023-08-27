const base = require("./_base");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: base.root,
  extends: ["plugin:@definitelytyped/eslint-plugin/all"],
  plugins: ["@definitelytyped/eslint-plugin"],
  rules: {
    ...base.rules,

    // Mute this rules as it conflict with dtslint
    "@typescript-eslint/array-type": "off",
  },
};
