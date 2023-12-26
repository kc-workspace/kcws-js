const createConfig = require("./src");
module.exports = createConfig({
  cwd: __dirname,
  profile: "node",
  typescript: false,
  commonjs: true,
  rushstack: true,
  local: true,
});
