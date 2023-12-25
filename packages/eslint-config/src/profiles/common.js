const { defineConfig, mergePlugins } = require("../utils/config");

module.exports = defineConfig({
  plugins: mergePlugins(
    "@rushstack/eslint-plugin-security",
    "eslint-plugin-unicorn",
    "eslint-plugin-deprecation",
    "eslint-plugin-import",
    "eslint-plugin-promise"
  ),
  extends: ["plugin:eslint-plugin-unicorn/recommended"],
  rules: {
    "@rushstack/security/no-unsafe-regexp": "warn",

    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        checkProperties: true,
        checkVariables: true,
        checkFilenames: true,
        extendDefaultReplacements: false,
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md#replacements
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/ae844593e62bd98a50a4e54a80a0566495f64c3b/rules/shared/abbreviations.js#L3
        replacements: {
          acc: {
            accumulator: true,
          },
          attr: {
            attribute: true,
          },
          attrs: {
            attributes: true,
          },
          def: {
            defer: true,
            deferred: true,
            define: true,
            definition: true,
          },
          dir: {
            direction: true,
            directory: true,
          },
          dst: {
            daylightSavingTime: true,
            destination: true,
            distribution: true,
          },
          e: {
            error: true,
            event: true,
          },
          err: {
            error: true,
          },
          ev: {
            event: true,
          },
          evt: {
            event: true,
          },
          ext: {
            extension: true,
          },
          exts: {
            extensions: true,
          },
          i: {
            index: true,
          },
          idx: {
            index: true,
          },
          j: {
            index: true,
          },
          opts: {
            options: true,
          },
          rej: {
            reject: true,
          },
          rel: {
            related: true,
            relationship: true,
            relative: true,
          },
          req: {
            request: true,
          },
          res: {
            resource: true,
            response: true,
            result: true,
          },
          ret: {
            returnValue: true,
          },
          retval: {
            returnValue: true,
          },
          str: {
            string: true,
          },
          tbl: {
            table: true,
          },
          tit: {
            title: true,
          },
          ver: {
            version: true,
          },
        },
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md#allowlist
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/ae844593e62bd98a50a4e54a80a0566495f64c3b/rules/shared/abbreviations.js#L231C16-L231C32
        allowList: {},
      },
    ],
  },
});
