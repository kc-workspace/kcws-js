const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  commonjs: true,
  rushstack: true,
});
