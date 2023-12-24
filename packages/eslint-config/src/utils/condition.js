/**
 *
 * @template T
 * @param {boolean} cond - input condition
 * @param {T} ifValue - value when condition is true
 * @param {T} elseValue - value when condition is false
 * @returns {T} return value based on condition
 */
function whatElif(cond, ifValue, elseValue) {
  return cond ? ifValue : elseValue;
}

/**
 *
 * @template T
 * @param {boolean} cond - input condition
 * @param {T} ifValue - value when condition is true
 * @returns {T | undefined} return value based on condition
 */
function whatIf(cond, ifValue) {
  return cond ? ifValue : undefined;
}

module.exports = {
  whatIf,
  whatElif,
};
