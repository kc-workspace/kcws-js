/* eslint @typescript-eslint/consistent-type-definitions: ["warn", "type"] */

// We use 'type' for consistently amount this file.
// And not have to append `I` to interface name.

/**
 * This is based option for multiple value randomizer.
 *
 * @public
 */
export type RandomMultipleValueOption<T> = {
  /**
   * list of whitelist values
   */
  whitelist: Array<T>;
};

/**
 * Option for weighted list.
 *
 * @public
 */
export type RandomWeightedOption<T> = {
  weight: number;
  value: T;
};

/**
 * option for random number.
 *
 * @public
 */
export type RandomNumberOption = {
  /**
   * minimum value of output
   */
  min: number;

  /**
   * maximum value of output.
   */
  max: number;

  /**
   * inclusive maximum value when generate output.
   */
  maxInclusive: boolean;

  /**
   * round output to integer
   */
  integerMode: boolean;
};

/**
 * option for random integer.
 *
 * @public
 */
export type RandomIntOption = Omit<RandomNumberOption, "integerMode">;

/**
 * option for random float.
 *
 * @public
 */
export type RandomFloatOption = Omit<
  RandomNumberOption,
  "integerMode" | "maxInclusive"
>;

/**
 * option for randomly select element from values.
 * Whitelist is a list of possible outcome.
 *
 * @public
 */
export type RandomSelectOption<T> = RandomMultipleValueOption<T>;

/**
 * option for random fixed length string.
 *
 * @public
 */
export type RandomFixedStringOption = RandomMultipleValueOption<string> & {
  length: number;
};

/**
 * option for random dynamic length string.
 *
 * @public
 */
export type RandomDynamicStringOption = RandomMultipleValueOption<string> &
  RandomIntOption;
