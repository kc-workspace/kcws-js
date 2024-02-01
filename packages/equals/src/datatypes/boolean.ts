import type { EqualFn, VEqualFn } from "../index.type";

import { isBoolean } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input boolean must be equals
 *
 * @param a - first input boolean
 * @param b - second input boolean
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isBooleanVEquals: VEqualFn<boolean> = (a, b) => {
  return a === b;
};

/**
 * check input data must be boolean and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isBooleanEquals: EqualFn = (a, b, setting) => {
  if (!isBoolean(a) || !isBoolean(b)) return EquivalentValue.DIFF_TYPE;
  else if (isBooleanVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
