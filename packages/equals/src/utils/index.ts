import type { DataType } from "@kcws/dtcheck";
import type { EqualFnMapper, VEqualFn } from "../index.type";

import { EquivalentValue, defaultEqualFnMapper } from "../constants";

/**
 * mapping equivalent value to boolean
 *
 * @param v - input equivalent value
 * @returns boolean based on equivalent value
 *
 * @internal
 * @deprecated This is from old version of equals logic
 */
export const toBoolean = (v: EquivalentValue): boolean | undefined => {
  if (v === EquivalentValue.EQUAL) return true;
  else if (v === EquivalentValue.DIFF_VALUE) return false;
  return undefined;
};

/**
 * find equal function based on input data type
 *
 * @param datatype - input data type
 * @param mapper - equal function mapper
 * @returns equals function
 */
export const getEqualFn = <T extends string>(
  datatype: DataType<T>,
  mapper?: EqualFnMapper<T>
): VEqualFn<unknown> => {
  const _mapper = Object.assign(defaultEqualFnMapper, mapper);
  const equalFn = _mapper[datatype];
  // TODO: Implement this error using @kcws/error package
  if (equalFn === undefined)
    throw new Error(`Cannot find valid equal function of '${datatype}'`);
  return equalFn;
};
