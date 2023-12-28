/**
 * @template T
 * @typedef {import('../types').Optional<T>} Optional<T>
 */

const { flatObject, isEmpty, toArray } = require("./helpers");

/**
 * @typedef {import('eslint').Linter.ParserOptions} EslintParserOptions
 * @typedef {string[]} EslintPlugins
 * @typedef {string[]} EslintExtends
 * @typedef {Record<string, unknown>} EslintSettings
 * @typedef {Record<string, boolean>} EslintEnvironment
 * @typedef {import('eslint').Linter.RulesRecord} EslintRules
 * @typedef {Partial<EslintRules>} EslintPartialRules
 * @typedef {import('eslint').Linter.ConfigOverride[]} EslintOverrides
 * @typedef {string[]} EslintIgnorePatterns
 */

/**
 * Return input config with autocomplete
 *
 * @param {import('eslint').Linter.Config} config - A return config
 * @returns {import('eslint').Linter.Config} a input config
 */
function defineConfig(config) {
  return config;
}

/**
 * Merge input roots
 *
 * @param  {...Optional<boolean>} roots eslint root field
 * @returns merged root config
 */
function mergeRoot(...roots) {
  return roots.includes(true);
}

/**
 * Merge input parsers
 *
 * @param  {...Optional<string>} parsers eslint parser field
 * @returns merged parser config
 */
function mergeParser(...parsers) {
  return parsers.findLast(p => typeof p === "string" && p.length > 0);
}

/**
 * Merge input options and flatten them
 *
 * @param  {...Optional<EslintParserOptions>} options - eslint parser options
 * @returns {EslintParserOptions} merged eslint parser options
 */
function mergeParserOptions(...options) {
  return Object.assign({}, ...options);
}

/**
 * Merge input plugins and flatten them
 *
 * @param {Optional<string | EslintPlugins>[]} plugins - eslint plugins list
 * @returns {EslintPlugins} merged eslint plugins
 */
function mergePlugins(...plugins) {
  return flatObject(...plugins.map(p => toArray(p)));
}

/**
 * Merge input extends value and flatten them
 *
 * @param {Optional<string | EslintExtends>[]} data - eslint extends list
 * @returns {EslintExtends} merged eslint extends
 */
function mergeExtends(...data) {
  return flatObject(...data.map(p => toArray(p)));
}

/**
 * Merge input settings value and flatten them
 *
 * @param {Optional<EslintSettings>[]} settings - eslint settings list
 * @returns {EslintSettings} merged eslint settings
 */
function mergeSettings(...settings) {
  return Object.assign({}, ...settings);
}

/**
 * Merge input environment value and flatten them
 *
 * @param {Optional<EslintEnvironment>[]} environments - eslint environments list
 * @returns {EslintEnvironment} merged eslint environments
 */
function mergeEnvironment(...environments) {
  return Object.assign({}, ...environments);
}

/**
 * Merge input rules value and flatten them
 *
 * @param  {...Optional<EslintPartialRules>} rules - eslint rules list
 * @returns {EslintRules}
 */
function mergeRules(...rules) {
  return Object.assign({}, ...rules.flat());
}

/**
 * Merge input overrides value and flatten them
 * @param  {...Optional<EslintOverrides>} overrides - eslint overrides list
 * @returns {EslintOverrides}
 */
function mergeOverrides(...overrides) {
  return flatObject(...overrides);
}

/**
 * Merge input ignore patterns and flatten them
 *
 * @param  {Optional<string | EslintIgnorePatterns>[]} ignorePatterns - eslint ignore pattern list
 * @returns {EslintIgnorePatterns} merged eslint ignore pattern
 */
function mergeIgnorePatterns(...ignorePatterns) {
  return flatObject(...ignorePatterns.map(p => toArray(p)));
}

/**
 * Merge 2 inputs config to single config
 *
 * @param {...Optional<import('eslint').Linter.Config>} configs - a config
 * @returns {import('eslint').Linter.Config} a merged config
 */
function mergeConfig(...configs) {
  /** @type {import('eslint').Linter.Config} */
  const config = {};

  const root = mergeRoot(...configs.map(c => c?.root));
  if (typeof root === "boolean") config.root = root;

  const parser = mergeParser(...configs.map(c => c?.parser));
  if (typeof parser === "string") config.parser = parser;

  const parserOptions = mergeParserOptions(
    ...configs.map(c => c?.parserOptions)
  );
  if (!isEmpty(parserOptions)) config.parserOptions = parserOptions;

  const plugins = mergePlugins(...configs.map(c => c?.plugins));
  if (!isEmpty(plugins)) config.plugins = plugins;

  const extend = mergeExtends(...configs.map(c => c?.extends));
  if (!isEmpty(extend)) config.extends = extend;

  const settings = mergeSettings(...configs.map(c => c?.settings));
  if (!isEmpty(settings)) config.settings = settings;

  const environment = mergeEnvironment(...configs.map(c => c?.env));
  if (!isEmpty(environment)) config.env = environment;

  const rules = mergeRules(...configs.map(c => c?.rules));
  if (!isEmpty(rules)) config.rules = rules;

  const overrides = mergeOverrides(...configs.map(c => c?.overrides));
  if (!isEmpty(overrides)) config.overrides = overrides;

  const ignorePatterns = mergeIgnorePatterns(
    ...configs.map(c => c?.ignorePatterns)
  );
  if (!isEmpty(ignorePatterns)) config.ignorePatterns = ignorePatterns;

  return config;
}

module.exports = {
  defineConfig,
  mergeParserOptions,
  mergePlugins,
  mergeExtends,
  mergeSettings,
  mergeEnvironment,
  mergeRules,
  mergeOverrides,
  mergeConfig,
};
