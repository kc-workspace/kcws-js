/**
 * Function for convert input value to another data type
 * @internal
 */
export type Convert<Input, Output> = (input: Input) => Output;

/**
 * Converter interface for all converter class
 * @public
 */
export interface BaseConverter<I, O> {
  readonly inputType: string;
  readonly targetType: string;
  convert: Convert<I, O>;
}
