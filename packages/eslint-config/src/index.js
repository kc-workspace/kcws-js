// require("./common/config")

const { whatIf } = require("./utils/condition");
const { mergeConfig, defineConfig, mergeExtends } = require("./utils/config");
const { resolveMixin, resolveProfile } = require("./utils/resolver");

/**
 * @param {import('./types').Data} data - a config data
 * @param {import('eslint').Linter.Config} override - a override eslint config
 * @returns {import('eslint').Linter.Config} a eslint config
 */
function createConfig(data, override) {
  require("./patch");

  const profile = data.profile ?? "";
  const base = defineConfig({
    root: true,
    parserOptions: {
      tsconfigRootDir: data.cwd,
    },
    extends: mergeExtends(
      "eslint:recommended",
      whatIf(profile.length > 0, resolveProfile(profile, data.local)),
      whatIf(data.typescript ?? true, resolveMixin("typescript", data.local)),
      whatIf(data.dtyped ?? false, resolveMixin("definitelytyped", data.local)),
      whatIf(data.tsdoc ?? false, resolveMixin("tsdoc", data.local)),
      whatIf(data.react ?? false, resolveMixin("react", data.local)),
      whatIf(data.jest ?? false, resolveMixin("jest", data.local)),
      whatIf(data.rushstack ?? false, resolveMixin("rushstack", data.local)),
      whatIf(data.commonjs ?? false, resolveMixin("commonjs", data.local)),
      whatIf(data.prettier ?? true, resolveMixin("prettier", data.local))
    ),
    ignorePatterns: ["dist/**", "temp/**", "lib/**", "lib-*/**", ".rush/**"],
  });

  return mergeConfig(base, override);
}

module.exports = createConfig;
