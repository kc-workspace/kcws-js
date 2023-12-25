const createConfig = require("./src");
module.exports = createConfig({
  cwd: __dirname,
  profile: "web",
  typescript: false,
  commonjs: true,
  local: true,
});
