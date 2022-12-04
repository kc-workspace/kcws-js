// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-tabs": "error",
    "no-bitwise": [
      "warn",
      {
        allow: ["^", "<<", ">>", ">>>", "^=", "<<=", ">>=", ">>>=", "~"],
        int32Hint: true,
      },
    ],
    "@typescript-eslint/member-ordering": [
      "warn",
      {
        default: {
          order: "as-written",
          memberTypes: [
            "signature",
            // Public static
            "public-static-field",
            "public-static-get",
            "public-static-set",
            "public-static-method",

            // Protected static
            "protected-static-field",
            "protected-static-get",
            "protected-static-set",
            "protected-static-method",

            // Private static
            "private-static-field",
            "private-static-get",
            "private-static-set",
            "private-static-method",

            // Field
            "public-field",
            "protected-field",
            "private-field",

            // Constructor
            "public-constructor",
            "protected-constructor",
            "private-constructor",

            // Getter and Setter
            "public-get",
            "public-set",
            "protected-get",
            "protected-set",
            "private-get",
            "private-set",

            // Method
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",

            // Public abstract
            "public-abstract-field",
            "public-abstract-get",
            "public-abstract-set",
            "public-abstract-method",

            // Protected abstract
            "protected-abstract-field",
            "protected-abstract-get",
            "protected-abstract-set",
            "protected-abstract-method",
          ],
        },
      },
    ],
    // This rule has been deprecated in favour of the equivalent,
    // better named parameter-properties rule.
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/parameter-properties": [
      "warn",
      { allow: ["readonly"], prefer: "class-property" },
    ],
    "@typescript-eslint/array-type": ["warn", { default: "generic" }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
        varsIgnorePattern: "^_*",
      },
    ],
  },
};
