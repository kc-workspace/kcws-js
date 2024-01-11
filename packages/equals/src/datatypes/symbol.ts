import type { EqualFn, VEqualFn } from "../types";

import { isSymbol } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * check input symbol must be equals
 *
 * @param a - first input symbol
 * @param b - second input symbol
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isSymbolVEquals: VEqualFn<symbol> = (a, b) => {
  return a.toString() === b.toString();
};

/**
 * check input data must be symbol and equals
 *
 * @param a - first input unknown
 * @param b - second input unknown
 * @param setting - equal settings
 * @returns true if input are equals; otherwise, return false
 *
 * @beta
 */
export const isSymbolEquals: EqualFn = (a, b, setting) => {
  if (!isSymbol(a) || !isSymbol(b)) return EquivalentValue.DIFF_TYPE;
  else if (isSymbolVEquals(a, b, setting)) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
