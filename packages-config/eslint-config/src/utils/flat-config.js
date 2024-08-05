/**
 * @template T
 * @typedef {import('../types').Optional<T>} Optional<T>
 */

/**
 * Return input flat config with autocomplete
 *
 * @param {import('eslint').Linter.FlatConfig} config - A return config
 * @returns {import('eslint').Linter.FlatConfig} a input config
 */
function defineFlatConfig(config) {
  return config;
}

/**
 * Merge multiple inputs flag config to single config
 *
 * @param {...Optional<import('../types').EslintFlatConfig>} configs - a config
 * @returns {import('../types').EslintFlatConfig[]} a merged config
 *
 * @alpha
 */
function mergeFlagConfig(...configs) {
  /** @type {import('../types').EslintFlatConfig} */
  const config = {};

  /** @type {import('../types').EslintFlatConfig[]} */
  const output = [config];

  for (const input of configs) {
    if (input !== undefined) {
      output.push(input);
    }
  }
  return output;
}

module.exports = { defineFlatConfig, mergeFlagConfig };
