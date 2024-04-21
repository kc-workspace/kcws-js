/**
 * @template T
 * @typedef {T | undefined} Optional<T>
 */

/**
 * @typedef {"node" | "web" | "types" | "common"} DataProfile
 * @typedef {"legacy" | "flat"} ConfigType
 * @typedef {import('eslint').Linter.ParserOptions["ecmaVersion"]} EcmaVersion
 * @typedef {import('eslint').Linter.Config} EslintConfig
 * @typedef {import('eslint').Linter.FlatConfig} EslintFlatConfig
 *
 * @typedef {object} Data                 - a data for generate eslint configs
 * @property {string} cwd                 - working directory (__dirname)
 * @property {DataProfile} [profile]      - a pre-defined profile
 * @property {ConfigType} [config=flat]   - a output config type
 * @property {EcmaVersion} [ecma=latest]  - a ecma version of javascript files
 * @property {boolean} [typescript=true]  - enabled typescript feature
 * @property {boolean} [dtyped=false]     - enabled definitelytyped feature
 * @property {boolean} [tsdoc=false]      - enabled tsdoc feature
 * @property {boolean} [commonjs=false]   - enabled commonjs feature
 * @property {boolean} [prettier=true]    - enabled prettier feature
 * @property {boolean} [react=false]      - enabled react feature
 * @property {boolean} [jest=false]       - enabled jest feature
 * @property {boolean} [rushstack=false]  - enabled rushstack feature
 * @property {boolean} [local=false]      - only for lint itself
 */

/**
 * @typedef {object} CustomEslintConfig
 * @property {"legacy"} [config=legacy]  - a output config type
 * @property {EslintConfig} [custom]     - custom config
 */

/**
 * @typedef {object} CustomEslintFlatConfig
 * @property {"flat"} [config=flat]      - a output config type
 * @property {EslintFlatConfig} [custom] - custom config
 */

module.exports = {};
