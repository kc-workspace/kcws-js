const base = require("./_base");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: base.root,
  extends: [
    "@rushstack/eslint-config/profile/node",
    "@rushstack/eslint-config/mixins/tsdoc",
  ],
  rules: {
    ...base.rules,
  },
};
