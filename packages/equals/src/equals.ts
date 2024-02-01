import type { ISettings } from "./index.type";

import { getDataType } from "@kcws/dtcheck";

import { getEqualFn } from "./utils";

/**
 * check input equivalent result.
 *
 * @param a - first input data
 * @param b - second input data
 * @param setting - equivalent settings
 * @returns true if inputs are equal; otherwise return false
 *
 * @public
 */
export const equals = (
  a: unknown,
  b: unknown,
  setting?: ISettings
): boolean => {
  const aType = getDataType(a, setting?.dataTypes);
  const bType = getDataType(b, setting?.dataTypes);

  // If not same type, equals always return false;
  if (aType !== bType) return false;

  const equalFn = getEqualFn(aType, setting?.equalFnMapper);
  return equalFn(a, b, setting);
};
