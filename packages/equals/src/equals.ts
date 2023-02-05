import type { ISettings } from "./interfaces";

import { isArray } from "@kcws/dtcheck";
import { isBigIntEquals } from "./bigint";
import { isBooleanEquals } from "./boolean";
import { isNumberEquals } from "./number";
import { isStringEquals } from "./string";
import { isSymbolEquals } from "./symbol";

/**
 * check is inputs equal or not
 *
 * @param a - first input
 * @param b - second input
 * @param setting - equal setting
 * @returns true if input is matches; otherwise, return false
 *
 * @beta
 */
export const equals = <T>(a: T, b: T, setting: ISettings): boolean => {
  // failure case
  if (typeof a !== typeof b) return false;

  // success case
  if (a === null && b === null) return true;
  if (a === undefined && b === undefined) return true;
  if (typeof a === "bigint" && typeof b === "bigint")
    return isBigIntEquals(a, b);
  if (typeof a === "boolean" && typeof b === "boolean")
    return isBooleanEquals(a, b);
  if (typeof a === "number" && typeof b === "number")
    return isNumberEquals(a, b);
  if (typeof a === "string" && typeof b === "string")
    return isStringEquals(a, b);
  if (typeof a === "symbol" && typeof b === "symbol")
    return isSymbolEquals(a, b);

  // TODO: implement equals for before types
  if (typeof a === "function") return false;
  if (isArray(a) && isArray(b)) return false;
  if (typeof a === "object") return false;

  return false;
};
