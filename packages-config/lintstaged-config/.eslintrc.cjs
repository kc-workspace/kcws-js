const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  ecma: 2016,
  tsdoc: true,
  jest: true,
  rushstack: true,
});
