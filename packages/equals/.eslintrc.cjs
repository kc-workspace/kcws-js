const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  profile: "web",
  tsdoc: true,
  jest: true,
  rushstack: true,
});
