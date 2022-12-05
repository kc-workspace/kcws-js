import { isExist } from "./exist";

/**
 * check input is string or not.
 *
 * @param input - any input
 * @returns true if input is string; otherwise, return false
 *
 * @public
 */
export const isString = (input: Optional<unknown>): input is string => {
  return isExist(input) && typeof input === "string";
};
