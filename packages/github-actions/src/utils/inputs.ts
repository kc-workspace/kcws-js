import { getInput, type InputOptions } from "@actions/core";

import { convert, type BaseConverter } from "../converters";
import { findEnvironment } from "./environments";

/**
 * find input from both yaml `with` argument and environment variables
 *
 * @param key - Input key (should be name in app context)
 * @param name - Input name
 * @param converter - Input converter to different data type
 * @param options - Input options
 * @returns Input data or undefined if not exist
 *
 * @public
 */
export const findInputs = <Output>(
  key: string,
  name: string,
  converter: BaseConverter<string, Output>,
  options?: InputOptions
): Output | undefined => {
  const options_ = {
    required: false,
    trimWhitespace: true,
    ...options,
  };

  return parseInputs(key, name, getInput(name, options_), converter);
};

/**
 * find data from environment variables or use `defaults` value.
 * If no data has been found, return `undefined`
 *
 * @param key Input key (should be name in app context)
 * @param name Input name
 * @param defaults Input default value
 * @param converter Input converter to different data type
 * @returns input data if exist, or undefined
 *
 * @internal
 */
export const parseInputs = <Output>(
  key: string,
  name: string,
  defaults: string | undefined | null,
  converter: BaseConverter<string, Output>
) => {
  const environment = findEnvironment([key, name]);
  const input = environment ?? defaults ?? "";
  return input === "" ? undefined : convert(input, converter);
};
