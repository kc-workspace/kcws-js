import type { ISettings } from "./interfaces";

import { isArray } from "@kcws/dtcheck";

import { isBigIntEquals } from "./bigint";
import { isBooleanEquals } from "./boolean";
import { isNumberEquals } from "./number";
import { isStringEquals } from "./string";
import { isSymbolEquals } from "./symbol";
import { EquivalentValue } from "./types";

const toBoolean = (v: EquivalentValue): boolean | undefined => {
  if (v === EquivalentValue.EQUAL) return true;
  else if (v === EquivalentValue.DIFF_VALUE) return false;
  return undefined;
};

/**
 * check only type of input using `typeof`
 *
 * @param a - first input
 * @param b - second input
 * @returns true if first and second has a same type
 *
 * @beta
 */
export const checkType = (a: unknown, b: unknown): boolean => {
  return typeof a === typeof b;
};

/**
 * check is inputs equal or not
 *
 * @param a - first input
 * @param b - second input
 * @param _setting - equal setting
 * @returns true if input is matches; otherwise, return false
 *
 * @beta
 */
export const equals = (
  a: unknown,
  b: unknown,
  _setting: ISettings
): boolean => {
  // If not same type, equals always return false;
  if (!checkType(a, b)) return false;
  // If null or undefined, equals return true;
  if (a === null && b === null) return true;
  if (a === undefined && b === undefined) return true;

  let result: boolean | undefined;

  result = toBoolean(isBigIntEquals(a, b));
  if (result !== undefined) return result;

  result = toBoolean(isNumberEquals(a, b));
  if (result !== undefined) return result;

  result = toBoolean(isBooleanEquals(a, b));
  if (result !== undefined) return result;

  result = toBoolean(isStringEquals(a, b));
  if (result !== undefined) return result;

  result = toBoolean(isSymbolEquals(a, b));
  if (result !== undefined) return result;

  if (typeof a === "function") return false;
  if (isArray(a) && isArray(b)) return false;
  if (typeof a === "object") return false;

  return false;
};
