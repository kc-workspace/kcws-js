/**
 * Create prettier config for all personal projects.
 *
 * Note that this package didn't use in kcws-js itself
 * since kcws-js requires to use json config.
 * Also the configuration on kcws-js itself uses legacy config
 * which some config has been changed to matched with new js standard.
 *
 * @param {import('./index.type').Data} data - a config data
 * @returns {import("prettier").Config}
 */
function createConfig(data) {
  /** @type {import('./index.type').PrettierConfig} */
  const base = {
    semi: false,
    trailingComma: "es5",
    singleQuote: false,
    arrowParens: "avoid",
    htmlWhitespaceSensitivity: "css",
  };

  return { ...base, ...data.custom };
}

module.exports = createConfig;
