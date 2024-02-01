import type { EqualFnMapper } from "../index.type";

import {
  isArrayVEquals,
  isBigIntVEquals,
  isBooleanVEquals,
  isFunctionVEquals,
  isNullVEquals,
  isNumberVEquals,
  isObjectVEquals,
  isStringVEquals,
  isSymbolVEquals,
  isUndefinedVEquals,
} from "../datatypes";

/**
 * Equivalent result
 *
 * @public
 */
export enum EquivalentValue {
  /** Data is equals */
  EQUAL = 0,
  /** Data type is different */
  DIFF_TYPE = 1,
  /** Data value is different, but type is the same */
  DIFF_VALUE = 2,
}

export const defaultEqualFnMapper: EqualFnMapper<never> = {
  array: isArrayVEquals,
  bigint: isBigIntVEquals,
  boolean: isBooleanVEquals,
  function: isFunctionVEquals,
  number: isNumberVEquals,
  object: isObjectVEquals,
  string: isStringVEquals,
  symbol: isSymbolVEquals,
  null: isNullVEquals,
  undefined: isUndefinedVEquals,
};
