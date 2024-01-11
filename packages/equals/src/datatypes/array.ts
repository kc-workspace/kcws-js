import type { EqualFn, VEqualFn } from "../types";

import { isArray } from "@kcws/dtcheck";

import { equals } from "..";
import { EquivalentValue } from "../constants";

/**
 * check input array must be equals (order or not depends on setting)
 *
 * @param a - first input array
 * @param b - second input array
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isArrayVEquals: VEqualFn<unknown[]> = (a, b, setting) => {
  if (a.length !== b.length) return false;
  return setting?.order ?? true
    ? a.every((av, index) => equals(av, b[index], setting))
    : a.every(av => b.some(value => equals(value, av, setting)));
};

/**
 * check input data must be array and equals (order or not depends on setting)
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isArrayEquals: EqualFn = (a, b, setting) => {
  if (!isArray(a) || !isArray(b)) return EquivalentValue.DIFF_TYPE;
  else if (isArrayVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
