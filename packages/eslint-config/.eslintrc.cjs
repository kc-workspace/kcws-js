const createConfig = require("./src");
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  commonjs: true,
  rushstack: true,
  local: true,
});
