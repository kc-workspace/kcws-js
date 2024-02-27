/**
 * create prettier config
 *
 * @param {import('./types').Data} data - a config data
 * @returns {import("prettier").Config}
 */
function createConfig(data) {
  /** @type {import('./types').PrettierConfig} */
  const base = {
    semi: true,
    trailingComma: "es5",
    singleQuote: false,
    arrowParens: "avoid",
    htmlWhitespaceSensitivity: "css",
  };

  return { ...base, ...data.custom };
}

module.exports = createConfig;
