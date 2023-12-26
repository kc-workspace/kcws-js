/**
 * Filter only exist value
 *
 * @template T
 * @param {T | undefined} value - input
 * @return {value is T}
 */
function isValid(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value.length <= 0) return false;
  return true;
}

/**
 * Convert input to array
 *
 * @template T
 * @param {T | Array<T> | undefined } input - input value or array
 * @returns {Array<T>} output array
 */
function toArray(input) {
  if (input === undefined) return [];
  else if (Array.isArray(input)) return input;
  else return [input];
}

/**
 * Flatten generic array with filter exist values
 *
 * @template T
 * @param {Array<Array<T | undefined>> | Array<Array<T | undefined> | undefined>} inputs - Input array
 * @returns {T[]} a flatten array
 */
function flatObject(...inputs) {
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return inputs.flat().filter(isValid);
}

/**
 * Check is input object/array is empty
 * @param {object|any[]} input - input data
 * @returns {boolean} true if input is empty
 */
function isEmpty(input) {
  if (Array.isArray(input)) return input.length <= 0;
  else if (typeof input === "object" && input === null) return true;
  else return Object.keys(input).length <= 0;
}

module.exports = {
  toArray,
  flatObject,
  isEmpty,
};
