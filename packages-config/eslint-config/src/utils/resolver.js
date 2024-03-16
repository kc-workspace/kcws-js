/**
 * resolve profiles path
 * @param {string} name - profile name
 * @param {boolean} [local] - resolve using local relative path
 * @return {string} extendable profile path
 *
 * @example
 *    resolveProfile("node")
 */
function resolveProfile(name, local) {
  const prefix = local === true ? `.` : `@kcws/eslint-config`;
  return `${prefix}/src/profiles/${name}.js`;
}

/**
 * resolve mixin path
 * @param {string} name - mixins name
 * @param {boolean} [local] - resolve using local relative path
 * @return {string} extendable mixin path
 *
 * @example
 *    resolveMixin("typescript")
 */
function resolveMixin(name, local) {
  const prefix = local === true ? `.` : `@kcws/eslint-config`;
  return `${prefix}/src/mixins/${name}.js`;
}

module.exports = {
  resolveProfile,
  resolveMixin,
};
