import type { ISeed } from "./ISeed";

/**
 * Random interface, All random class must implement this interface.
 *
 * @public
 */
export interface IRandom {
  /**
   * Generate pseudo random number.
   * This function should return a number between 0 and 1.
   *
   * @internal
   */
  pseudo(): number;

  /**
   * copy random to new instance.
   *
   * @param seed - new seed
   *
   * @public
   */
  copy(seed: ISeed): IRandom;
}
