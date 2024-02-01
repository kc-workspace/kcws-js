import type { EqualFn, VEqualFn } from "../index.type";

import { isObject } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input object must be equals
 *
 * @param a - first input object
 * @param b - second input object
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isObjectVEquals: VEqualFn<object> = (a, b) => {
  return a === b;
};

/**
 * check input data must be object and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isObjectEquals: EqualFn = (a, b, setting) => {
  if (!isObject<object>(a) || !isObject<object>(b))
    return EquivalentValue.DIFF_TYPE;
  else if (isObjectVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
