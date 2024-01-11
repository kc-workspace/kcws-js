import { isExist } from "./exist";

// eslint-disable-next-line @typescript-eslint/ban-types
const checkObjectConstructor = <C extends Function>(
  input: Optional<unknown>,
  constructor: C
): input is C => {
  return isExist(input) && (input as object).constructor === constructor;
};

/**
 * check input is big integer number or not.
 *
 * @param input - any input
 * @returns true if input is big integer type; otherwise, return false
 *
 * @public
 */
export const isBigInteger = (input: Optional<unknown>): input is bigint => {
  if (typeof input === "bigint") return true;
  if (checkObjectConstructor(input, BigInt)) return true;
  return false;
};

/**
 * check input is number or not.
 *
 * @param input - any input
 * @param ignoreSpecial - set to true will treat NaN/Infinity as number
 * @returns true if input is number; otherwise, return false
 *
 * @public
 */
export const isNumber = (
  input: Optional<unknown>,
  ignoreSpecial: boolean = false
): input is number => {
  if (typeof input === "number") return ignoreSpecial || Number.isFinite(input);
  if (checkObjectConstructor(input, Number)) return true;
  return false;
};

/**
 * check input is integer number or not.
 *
 * @param input - any input
 * @returns true if input is integer number; otherwise, return false
 *
 * @public
 */
export const isInteger = (input: Optional<unknown>): input is number => {
  if (!isNumber(input)) return false;
  return Math.round(input) === input;
};

/**
 * check input is float number or not.
 *
 * @param input - any input
 * @returns true if input is float number; otherwise, return false
 *
 * @public
 */
export const isFloat = (input: Optional<unknown>): input is number => {
  if (!isNumber(input)) return false;
  return Math.round(input) !== input;
};
