const definePlugins = require("./plugins");
const defineExtends = require("./extends");
const defineRules = require("./rules");
const defineOverrides = require("./overrides");

/**
 * Define eslint configs
 * @param {import("./extends").Profile | undefined} profile - a rushstack pre-defined profile
 * @param {import('eslint').Linter.Config} custom - custom config to override
 * @param {boolean} debug - enabled debug log when define config
 * @returns {import('eslint').Linter.Config}
 */
const defineConfig = (profile, custom = {}, debug = false) => {
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  //@ts-ignore
  require("@rushstack/eslint-config/patch/modern-module-resolution");

  const plugin = custom.plugins ?? [];
  const extend = custom.extends ? [custom.extends].flat() : [];
  const rules = custom.rules ?? {};
  const overrides = custom.overrides ?? [];

  /** @type {import('eslint').Linter.Config} */
  const config = {
    root: true,
    plugins: definePlugins(plugin),
    extends: defineExtends(profile, extend),
    rules: defineRules(rules),
    overrides: defineOverrides(overrides),
  };

  if (debug) console.log(config);
  return config;
};

module.exports = defineConfig;
