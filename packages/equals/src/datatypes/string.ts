import type { EqualFn, VEqualFn } from "../types";

import { isString } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input string must be equals
 *
 * @param a - first input string
 * @param b - second input string
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isStringVEquals: VEqualFn<string> = (a, b) => {
  return a === b;
};

/**
 * check input data must be string and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isStringEquals: EqualFn = (a, b, setting) => {
  if (!isString(a) || !isString(b)) return EquivalentValue.DIFF_TYPE;
  else if (isStringVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
