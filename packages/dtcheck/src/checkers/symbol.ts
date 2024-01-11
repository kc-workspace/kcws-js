import { isExist } from "./exist";

/**
 * check input is symbol or not.
 *
 * @param input - any input
 * @returns true if input is function; otherwise, return false
 *
 * @public
 */
export const isSymbol = (input: Optional<unknown>): input is symbol => {
  return isExist(input) && typeof input === "symbol";
};
