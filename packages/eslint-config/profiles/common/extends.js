/**
 * @typedef {"node-trusted-tool" | "node" | "web-app"} Profile
 */

/**
 * define extends with input additional extends
 * @param {Profile | undefined} profile - a rushstack pre-defined profile
 * @param {string[][]} extend - additional extends
 * @returns {string[]}
 *
 * @beta
 */
module.exports = (profile, ...extend) => {
  /** @type {string[]} */
  const base = [];

  if (profile) base.push(`@rushstack/eslint-config/profile/${profile}`);
  base.push("@rushstack/eslint-config/mixins/tsdoc");

  return base.concat(extend.flat().filter((v) => typeof v === "string"));
};
