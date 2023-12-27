import type { SeedBuilder } from "../ISeed";

import { Seed } from "../Seed";

/**
 * Xfnv1a implementation for random seed.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
 *
 * @public
 */
export class SeedXfnv1a extends Seed {
  /**
   * SeedBuilder for Xfnv1a algorithm
   *
   * @param input - any string
   * @returns function for generate seed value
   *
   * @public
   */
  public static Builder: SeedBuilder = input => {
    let h = 2_166_136_261 >>> 0;
    for (let index = 0; index < input.length; index++)
      h = Math.imul(h ^ input.charCodeAt(index), 16_777_619);

    return () => {
      h += h << 13;
      h ^= h >>> 7;
      h += h << 3;
      h ^= h >>> 17;
      h += h << 5;
      return h >>> 0;
    };
  };

  /**
   * Create new Xfnv1a seed algorithm
   *
   * @param input - any string
   *
   * @public
   */
  public constructor(input: string) {
    super(input, SeedXfnv1a.Builder);
  }
}
