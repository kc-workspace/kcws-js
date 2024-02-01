import type { EqualFn, VEqualFn } from "../index.type";

import { EquivalentValue } from "../constants";

/**
 * check input must be equals to undefined
 *
 * @param a - first input
 * @param b - second input
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isUndefinedVEquals: VEqualFn<unknown> = (a, b) => {
  return a === undefined && b === undefined;
};

/**
 * check both input data must be undefined
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isUndefinedEquals: EqualFn = (a, b) => {
  if (isUndefinedVEquals(a, b)) return EquivalentValue.EQUAL;
  return EquivalentValue.DIFF_VALUE;
};
