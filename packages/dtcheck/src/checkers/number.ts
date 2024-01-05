import { isNotExist } from "./exist";

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
  if (isNotExist(input)) return false;
  if (typeof input !== "number") return false;

  if (ignoreSpecial) return true;

  return !Number.isNaN(input) && Number.isFinite(input);
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
