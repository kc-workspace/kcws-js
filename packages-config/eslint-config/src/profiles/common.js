const { defineConfig, mergePlugins } = require("../utils/config");

module.exports = defineConfig({
  plugins: mergePlugins(
    "@rushstack/eslint-plugin-security",
    "eslint-plugin-unicorn",
    "eslint-plugin-import-x",
    "eslint-plugin-promise"
  ),
  extends: [
    "plugin:eslint-plugin-unicorn/recommended",
    "plugin:import-x/recommended",
    "plugin:promise/recommended",
  ],
  rules: {
    "@rushstack/security/no-unsafe-regexp": "warn",
    "unicorn/switch-case-braces": ["error", "avoid"],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: [/\.md$/],
      },
    ],
    "unicorn/import-style": [
      "warn",
      {
        extendDefaultStyles: false,
        // checkExportFrom: true,
        styles: {
          util: {
            named: true,
          },
          "node:util": {
            named: true,
          },
          path: {
            default: true,
            named: true,
          },
          "node:path": {
            default: true,
            named: true,
          },
          chalk: {
            default: true,
            named: true,
          },
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        checkProperties: false,
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
    "import-x/no-deprecated": "warn",
    "import-x/first": "error",
    // NOTES: Expensive rules with comparatively computationally
    "import-x/no-cycle": ["error", { ignoreExternal: true }],
    "import-x/no-absolute-path": "error",
    "import-x/no-self-import": "error",
    "import-x/newline-after-import": "warn",
    "import-x/no-empty-named-blocks": "warn",
    "import-x/no-namespace": "warn",
    "import-x/order": [
      "warn",
      {
        "newlines-between": "always",
        groups: [
          "type",
          ["builtin", "external", "internal"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
      },
    ],
    "promise/prefer-await-to-then": "warn",
  },
});
