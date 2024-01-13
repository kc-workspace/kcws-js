/**
 * create prettier config
 *
 * @returns {import("prettier").Config}
 */
function createConfig() {
  return {
    semi: true,
    trailingComma: "es5",
    singleQuote: false,
    arrowParens: "avoid",
    htmlWhitespaceSensitivity: "css",
  };
}

module.exports = createConfig();
