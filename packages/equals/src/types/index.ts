import type { DataType, ISettings as DataTypeISettings } from "@kcws/dtcheck";

import { EquivalentValue } from "../constants";

/**
 * A equivalent check function with settings.
 * @see {@link VEqualFn} - The function guarantee input data type must be the same
 *
 * @public
 */
export type EqualFn<A = unknown, B = unknown> = (
  a: A,
  b: B,
  setting?: ISettings
) => EquivalentValue;

/**
 * A check function which guarantee input must be same data type.
 * @see {@link EqualFn} - The function not guarantee input data type
 *
 * @public
 */
export type VEqualFn<T> = (a: T, b: T, setting?: ISettings) => boolean;

export type EqualFnMapper<T extends string> = Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<DataType<T>, VEqualFn<any>>
> &
  Record<T, VEqualFn<unknown>>;

/**
 * Equivalent settings
 *
 * @public
 */
export interface ISettings<T extends string = ""> {
  /**
   * If order is true, the equality will be true only if data are same order
   * @defaultValue `true`
   *
   * @remarks
   * This options only support Array at the moment
   */
  order?: boolean;

  /**
   * Setting to resolve data type using `@kcws/dtcheck` package
   */
  dataTypes?: DataTypeISettings<T>;

  /**
   * Custom logic to check input equality.
   * This function guarantee input must be same data type.
   */
  equalFnMapper?: EqualFnMapper<T>;
}
