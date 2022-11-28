import type { SeedBuilder } from "../ISeed";
import { Seed } from "../Seed";

/**
 * Xmur3 implementation for random seed.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions
 *
 * @public
 */
export class SeedXmur3 extends Seed {
  /**
   * SeedBuilder for Xmur3 algorithm
   *
   * @param input - any string
   * @returns function for generate seed value
   *
   * @public
   */
  public static Builder: SeedBuilder = (input) => {
    let h = 1779033703 ^ input.length;
    for (let i = 0; i < input.length; i++) {
      h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
      /* eslint-disable-next-line no-bitwise */
      h = (h << 13) | (h >>> 19);
    }

    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  };

  /**
   * Create new Xmur3 seed algorithm
   *
   * @param input - any string
   *
   * @public
   */
  public constructor(input: string) {
    super(input, SeedXmur3.Builder);
  }
}
