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
  return flatObject(...plugins.map((p) => toArray(p)));
}

/**
 * Merge input extends value and flatten them
 *
 * @param {Optional<string | EslintExtends>[]} data - eslint extends list
 * @returns {EslintExtends} merged eslint extends
 */
function mergeExtends(...data) {
  return flatObject(...data.map((p) => toArray(p)));
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
 * @param {Optional<EslintEnvironment>[]} envs - eslint environments list
 * @returns {EslintEnvironment} merged eslint environments
 */
function mergeEnvironment(...envs) {
  return Object.assign({}, ...envs);
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
  return flatObject(...ignorePatterns.map((p) => toArray(p)));
}

/**
 * Merge 2 inputs config to single config
 *
 * @param {import('eslint').Linter.Config} a - First config
 * @param {import('eslint').Linter.Config} b - First config
 * @returns {import('eslint').Linter.Config} a merged config
 */
function mergeConfig(a, b) {
  /** @type {import('eslint').Linter.Config} */
  const config = {};

  const root = a?.root || b?.root;
  if (typeof root === "boolean") config.root = root;

  const parser = b?.parser ?? a?.parser;
  if (typeof parser === "string") config.parser = parser;

  const parserOptions = mergeParserOptions(a?.parserOptions, b?.parserOptions);
  if (!isEmpty(parserOptions)) config.parserOptions = parserOptions;

  const plugins = mergePlugins(a?.plugins, b?.plugins);
  if (!isEmpty(plugins)) config.plugins = plugins;

  const extend = mergeExtends(a?.extends, b?.extends);
  if (!isEmpty(extend)) config.extends = extend;

  const settings = mergeSettings(a?.settings, b?.settings);
  if (!isEmpty(settings)) config.settings = settings;

  const env = mergeEnvironment(a?.env, b?.env);
  if (!isEmpty(env)) config.env = env;

  const rules = mergeRules(a?.rules, b?.rules);
  if (!isEmpty(rules)) config.rules = rules;

  const overrides = mergeOverrides(a?.overrides, b?.overrides);
  if (!isEmpty(overrides)) config.overrides = overrides;

  const ignorePatterns = mergeIgnorePatterns(
    a?.ignorePatterns,
    b?.ignorePatterns
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
