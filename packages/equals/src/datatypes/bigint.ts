import type { EqualFn, VEqualFn } from "../index.type";

import { isBigInteger } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input bigint must be equals
 *
 * @param a - first input bigint
 * @param b - second input bigint
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isBigIntVEquals: VEqualFn<bigint> = (a, b) => {
  return a === b;
};

/**
 * check input data must be bigint and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isBigIntEquals: EqualFn = (a, b, setting) => {
  if (!isBigInteger(a) || !isBigInteger(b)) return EquivalentValue.DIFF_TYPE;
  else if (isBigIntVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
