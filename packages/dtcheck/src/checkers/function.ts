import { isExist } from "./exist";

/**
 * check input is function or not.
 *
 * @param input - any input
 * @returns true if input is function; otherwise, return false
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (input: Optional<unknown>): input is Function => {
  return isExist(input) && typeof input === "function";
};
