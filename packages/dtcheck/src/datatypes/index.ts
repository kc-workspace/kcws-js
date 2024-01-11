import { isArray } from "..";

/**
 * Support data type for mapping data by type
 *
 * @public
 */
export type DataType<T extends string> =
  | "undefined"
  | "null"
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "function"
  | "object"
  | "array"
  | "symbol"
  | T;

/**
 * Function returns a type of input data.
 * This also support custom data type using generic type.
 *
 * @public
 */
export type TMapFn<T extends string> = (
  input: unknown
) => DataType<T> | undefined;

/**
 * Equivalent settings
 * @public
 */
export interface ISettings<T extends string = ""> {
  /**
   * Force data types to be this, regardless of resolver.
   */
  override?: DataType<T>;

  /**
   * Mapping data to type string;
   * This function should return name of input data type
   * however if return undefined, it will fallback default resolver.
   */
  mapper?: TMapFn<T>;
}

const _defaultMapper = <T extends string>(data: unknown): DataType<T> => {
  if (data === null) return "null";
  if (isArray(data)) return "array";
  return typeof data;
};

/**
 * get data type of input data in string format
 *
 * @param data - input data
 * @param settings - settings for resolve data type
 * @returns data type string
 *
 * @public
 */
export const getDataType = <T extends string = "">(
  data: unknown,
  settings?: ISettings<T>
): DataType<T> => {
  if (typeof settings?.override === "string") {
    return settings.override;
  }

  const dataType = settings?.mapper?.(data);
  return dataType ?? _defaultMapper<T>(data);
};
