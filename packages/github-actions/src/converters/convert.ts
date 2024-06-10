import type { BaseConverter } from "./convert.type";

import { ConvertError } from "./errors";

/**
 * Convert input data type to another data type
 * @param data - input data
 * @param converter - Converter class for converting input data
 * @returns output data
 * @public
 */
export const convert = <Output, Input>(
  data: Input,
  converter: BaseConverter<Input, Output>
): Output => {
  try {
    return converter.convert(data);
  } catch (error) {
    throw new ConvertError(data, converter.targetType, error as Error);
  }
};
