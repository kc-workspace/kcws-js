/**
 * define overrides with input additional overrides
 * @param {import('eslint').Linter.ConfigOverride[][]} overrides - additional overrides
 * @returns {import('eslint').Linter.ConfigOverride[]}
 *
 * @beta
 */
module.exports = (...overrides) => {
  /** @type {import('eslint').Linter.ConfigOverride[]} */
  const base = [];

  return base.concat(overrides.flat().filter((v) => typeof v === "string"));
};
