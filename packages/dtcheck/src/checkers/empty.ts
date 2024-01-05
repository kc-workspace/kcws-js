import { isArray } from "./array";
import { isNotExist } from "./exist";
import { isObject } from "./object";
import { isString } from "./string";

/**
 * Empty when following condition
 *   - undefined or null
 *   - empty string
 *   - empty object
 *   - empty array
 *
 * @param input - any input
 * @returns true if input is empty
 *
 * @public
 */
export const isEmpty = <T = unknown>(input: Optional<T>): input is Null => {
  if (isNotExist(input)) return true;
  if (isObject(input) && isEmpty(Object.keys(input as object))) return true;
  if (isArray(input) && input.length <= 0) return true;
  if (isString(input) && input === "") return true;

  return false;
};

/**
 * Not-empty when following condition
 *   - NOT undefined or null
 *   - NOT empty string
 *   - NOT empty object
 *   - NOT empty array
 *
 * @param input - any input
 * @returns true if input is defined and has value
 *
 * @public
 */
export const isNotEmpty = <T = unknown>(input: Optional<T>): input is T => {
  return !isEmpty(input);
};
