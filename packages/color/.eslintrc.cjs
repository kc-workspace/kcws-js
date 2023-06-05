// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@kcws/eslint-config/patch/modern-module-resolution");

module.exports = {
  extends: ["@kcws/eslint-config/profiles/web"],
  parserOptions: { tsconfigRootDir: __dirname },
};
