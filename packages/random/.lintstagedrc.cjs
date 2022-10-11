const { regex, prettier, eslint } = require("@kcws/lintstaged-config");

module.exports = {
  [regex("json")]: prettier({ fix: true }),
  [regex("js", "jsx", "ts", "tsx")]: eslint({ fix: true, maxWarnings: 0 }),
};
