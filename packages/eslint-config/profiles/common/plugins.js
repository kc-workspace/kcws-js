/**
 * define plugins with input additional plugins
 * @param {string[][]} plugins - additional plugins
 * @returns {string[]}
 *
 * @beta
 */
module.exports = (...plugins) => {
  /** @type {string[]} */
  const base = [];

  return base.concat(plugins.flat().filter((v) => typeof v === "string"));
};
