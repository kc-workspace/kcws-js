// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
  extends: [
    "@rushstack/eslint-config/profile/node",
    "@rushstack/eslint-config/mixins/tsdoc"
  ],
  rules: {
    "@typescript-eslint/member-ordering": [
      "warn",
      {
        default: [
          // Index signature
          "signature",

          // Fields
          "public-static-field",
          "protected-static-field",
          "private-static-field",

          "public-decorated-field",
          "protected-decorated-field",
          "private-decorated-field",

          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",

          "public-abstract-field",
          "protected-abstract-field",
          "private-abstract-field",

          "public-field",
          "protected-field",
          "private-field",

          "static-field",
          "instance-field",
          "abstract-field",

          "decorated-field",

          "field",

          // Static initialization
          "static-initialization",

          // Constructors
          "public-constructor",
          "protected-constructor",
          "private-constructor",

          "constructor",

          // Getters
          "public-static-get",
          "protected-static-get",
          "private-static-get",

          "public-decorated-get",
          "protected-decorated-get",
          "private-decorated-get",

          "public-instance-get",
          "protected-instance-get",
          "private-instance-get",

          "public-abstract-get",
          "protected-abstract-get",
          "private-abstract-get",

          "public-get",
          "protected-get",
          "private-get",

          "static-get",
          "instance-get",
          "abstract-get",

          "decorated-get",

          "get",

          // Setters
          "public-static-set",
          "protected-static-set",
          "private-static-set",

          "public-decorated-set",
          "protected-decorated-set",
          "private-decorated-set",

          "public-instance-set",
          "protected-instance-set",
          "private-instance-set",

          "public-abstract-set",
          "protected-abstract-set",
          "private-abstract-set",

          "public-set",
          "protected-set",
          "private-set",

          "static-set",
          "instance-set",
          "abstract-set",

          "decorated-set",

          "set",

          // Methods
          "public-static-method",
          "protected-static-method",
          "private-static-method",

          "public-decorated-method",
          "protected-decorated-method",
          "private-decorated-method",

          "public-instance-method",
          "protected-instance-method",
          "private-instance-method",

          "public-abstract-method",
          "protected-abstract-method",
          "private-abstract-method",

          "public-method",
          "protected-method",
          "private-method",

          "static-method",
          "instance-method",
          "abstract-method",

          "decorated-method",

          "method",
        ],
      },
    ],
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
    ]
  },
};
