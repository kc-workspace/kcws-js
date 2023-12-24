const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  jest: true,
});
