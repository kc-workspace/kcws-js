import type { EqualFn, VEqualFn } from "../index.type";

import { EquivalentValue } from "../constants";

/**
 * check input must be equals to null
 *
 * @param a - first input
 * @param b - second input
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
// eslint-disable-next-line @rushstack/no-new-null
export const isNullVEquals: VEqualFn<object | null> = (a, b) => {
  return a === null && b === null;
};

/**
 * check both input data must be null
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isNullEquals: EqualFn = (a, b) => {
  if (typeof a !== "object" || typeof b !== "object")
    return EquivalentValue.DIFF_TYPE;
  if (isNullVEquals(a, b)) return EquivalentValue.EQUAL;
  return EquivalentValue.DIFF_VALUE;
};
