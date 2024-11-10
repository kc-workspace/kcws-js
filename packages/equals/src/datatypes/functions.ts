import type { EqualFn, VEqualFn } from "../index.type";

import { isFunction } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input Function must be equals
 *
 * @param a - first input function
 * @param b - second input function
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunctionVEquals: VEqualFn<Function> = (a, b) => {
  return a === b;
};

/**
 * check input data must be function and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isFunctionEquals: EqualFn = (a, b, setting) => {
  if (!isFunction(a) || !isFunction(b)) return EquivalentValue.DIFF_TYPE;
  else if (isFunctionVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
