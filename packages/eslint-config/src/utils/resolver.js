/**
 * resolve profiles path
 * @param {string} name - profile name
 * @return {string} extendable profile path
 *
 * @example
 *    resolveProfile("node")
 */
function resolveProfile(name) {
  return `@kcws/eslint-config/src/profiles/${name}.js`;
}

/**
 * resolve mixin path
 * @param {string} name - mixins name
 * @return {string} extendable mixin path
 *
 * @example
 *    resolveMixin("typescript")
 */
function resolveMixin(name) {
  return `@kcws/eslint-config/src/mixins/${name}.js`;
}

module.exports = {
  resolveProfile,
  resolveMixin,
};
