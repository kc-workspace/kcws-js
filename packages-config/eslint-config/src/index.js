const { mergeConfig, defineConfig, mergeExtends } = require("./utils/config");
const { whatIf } = require("./utils/condition");
const { resolveMixin, resolveProfile } = require("./utils/resolver");

/**
 * @param {import('./types').Data} data - a config data
 * @returns {import("eslint").Linter.RulesRecord}
 */
function createRules(data) {
  /** @type {import("eslint").Linter.RulesRecord} */
  const rules = {};
  const version = data.ecma;

  // Doesn't support ecma version below 2017 (aka es8)
  if (
    typeof version === "number" &&
    ((version > 2000 && version < 2017) || version < 8)
  ) {
    return {
      "promise/prefer-await-to-then": "off",
      "prefer-await-to-callbacks": "off",
    };
  }
  return rules;
}

/**
 * @param {import('./types').Data & (import('./types').CustomEslintConfig | import('./types').CustomEslintFlatConfig)} data - a config data
 * @returns {import('./types').EslintConfig | import('./types').EslintFlatConfig | import('./types').EslintFlatConfig[] | undefined} a eslint config
 */
function createConfig(data) {
  if (!data.config) data.config = "legacy";

  if (data.config === "legacy") {
    require("./patch");

    const profile = data.profile ?? "";
    const base = defineConfig({
      root: true,
      parserOptions: {
        tsconfigRootDir: data.cwd,
        ecmaVersion: data.ecma ?? "latest",
      },
      extends: mergeExtends(
        "eslint:recommended",
        whatIf(profile.length > 0, resolveProfile(profile, data.local)),
        whatIf(data.typescript ?? true, resolveMixin("typescript", data.local)),
        whatIf(
          data.dtyped ?? false,
          resolveMixin("definitelytyped", data.local)
        ),
        whatIf(data.tsdoc ?? false, resolveMixin("tsdoc", data.local)),
        whatIf(data.react ?? false, resolveMixin("react", data.local)),
        whatIf(data.jest ?? false, resolveMixin("jest", data.local)),
        whatIf(data.rushstack ?? false, resolveMixin("rushstack", data.local)),
        whatIf(data.commonjs ?? false, resolveMixin("commonjs", data.local)),
        whatIf(data.prettier ?? true, resolveMixin("prettier", data.local))
      ),
      rules: createRules(data),
      ignorePatterns: [
        ".eslintrc.cjs",
        "dist/**",
        "temp/**",
        "lib/**",
        "lib-*/**",
        ".rush/**",
        "coverage/**",
      ],
    });

    return mergeConfig(base, data.custom);
  }

  if (data.config === "flat") {
    // TODO: Implement eslint flat config builder
    // const base = defineFlatConfig({
    //   name: "hello world",
    //   languageOptions: {
    //     ecmaVersion: data.ecma ?? "latest",
    //     parserOptions: {
    //       tsconfigRootDir: data.cwd,
    //       ecmaVersion: data.ecma ?? "latest",
    //     },
    //   },
    //   ignores: [
    //     ".eslintrc.cjs",
    //     "dist/**",
    //     "temp/**",
    //     "lib/**",
    //     "lib-*/**",
    //     ".rush/**",
    //     "coverage/**",
    //   ],
    // });

    throw new Error(
      "Flag config is not support yet! " +
        "waiting @typescript-eslint to support"
    );
    // return mergeFlagConfig(base, data.custom);
  }
}

module.exports = createConfig;
