const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  profile: "web",
  tsdoc: true,
  jest: true,
  rushstack: true,
  custom: {
    rules: {
      "unicorn/prefer-code-point": "off",
      "unicorn/filename-case": [
        "error",
        {
          cases: { kebabCase: true, pascalCase: true },
          ignore: [/^Random.*/, /^Seed.*/],
        },
      ],
    },
  },
});
