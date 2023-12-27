import type { SeedBuilder } from "../ISeed";

import { Seed } from "../Seed";

/**
 * Timestamp implementation for random seed.
 * This always return current timestamp
 *
 * @public
 */
export class SeedTimestamp extends Seed {
  /**
   * SeedBuilder for Timestamp algorithm
   *
   * @returns function for generate seed value
   *
   * @public
   */
  public static Builder: SeedBuilder = () => {
    return () => Date.now();
  };

  /**
   * Create new Timestamp seed algorithm
   *
   * @public
   */
  public constructor() {
    super("", SeedTimestamp.Builder);
  }
}
