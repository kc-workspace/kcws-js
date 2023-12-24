const createConfig = require("@kcws/eslint-config");
module.exports = createConfig(
  {
    cwd: __dirname,
    profile: "common",
    dtyped: true,
  },
  {
    rules: {
      // This false positive global types as unused vars
      "no-unused-vars": "off",
    },
  }
);
