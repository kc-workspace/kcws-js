/**
 * @template T
 * @typedef {T | undefined} Optional<T>
 */

/**
 * @typedef {"node" | "web" | "types" | "common"} DataProfile
 *
 * @typedef {object} Data                - a data for generate eslint configs
 * @property {string} cwd                - working directory (__dirname)
 * @property {DataProfile} [profile]     - a pre-defined profile
 * @property {boolean} [typescript=true] - enabled typescript feature
 * @property {boolean} [dtyped=false]    - enabled definitelytyped feature
 * @property {boolean} [tsdoc=false]     - enabled tsdoc feature
 * @property {boolean} [prettier=true]   - enabled prettier feature
 * @property {boolean} [react=false]     - enabled react feature
 * @property {boolean} [jest=false]      - enabled jest feature
 * @property {boolean} [rushstack=false] - enabled rushstack feature
 */

export {};
