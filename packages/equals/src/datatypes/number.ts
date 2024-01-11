import type { EqualFn, VEqualFn } from "../types";

import { isNumber } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input number must be equals
 *
 * @param a - first input number
 * @param b - second input number
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isNumberVEquals: VEqualFn<number> = (a, b) => {
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  return a === b;
};

/**
 * check input data must be number and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isNumberEquals: EqualFn = (a, b, setting) => {
  if (!isNumber(a) || !isNumber(b)) return EquivalentValue.DIFF_TYPE;
  else if (isNumberVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
