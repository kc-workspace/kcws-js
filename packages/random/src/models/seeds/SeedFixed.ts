import type { SeedBuilder } from "../ISeed";
import { Seed } from "../Seed";

/**
 * Fixed implementation for random seed.
 * This always return single value from input.
 *
 * @remarks
 *
 * You should use this seed for testing only,
 * Since it will always return fixed value,
 * no matter how many times we called.
 *
 * @public
 */
export class SeedFixed extends Seed {
  /**
   * SeedBuilder for Fixed algorithm
   *
   * @param input - any string
   * @returns function for generate seed value
   *
   * @public
   */
  public static Builder: SeedBuilder = (input) => {
    return () => parseFloat(input);
  };

  /**
   * Create new Fixed seed algorithm
   *
   * @param input - any integer/double
   *
   * @public
   */
  public constructor(input: number) {
    super(input.toString(), SeedFixed.Builder);
  }
}
