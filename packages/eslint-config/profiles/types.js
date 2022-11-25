const base = require("./_base");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: base.root,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    ...base.rules,

    // Mute this rules as it conflict with dtslint
    "@typescript-eslint/array-type": "off",

    // Rules for types
    // https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/dtslint/src/rules
    "dt-header": "error",
    "export-just-namespace": "error",
    "no-bad-reference": "error",
    "no-dead-reference": "error",
    "no-const-enum": "error",
    "no-useless-files": "error",
    "trim-file": "error",
  },
};
