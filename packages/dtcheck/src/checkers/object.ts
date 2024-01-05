import { isNotExist } from "./exist";
import { isArray } from "./array";

/**
 * check input is object or not.
 *
 * @param input - any input
 * @returns true if input is valid object; otherwise, return false
 *
 * @public
 */
export const isObject = <T = unknown>(input: Optional<T>): input is T => {
  if (isNotExist(input)) return false;
  if (isArray(input)) return false;

  return typeof input === "object";
};
