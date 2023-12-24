const { mergeConfig } = require("../utils/config");
const common = require("./common");

module.exports = mergeConfig(common, {
  env: {
    browser: true,
  },
});
