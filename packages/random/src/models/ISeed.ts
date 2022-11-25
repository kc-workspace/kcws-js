/**
 * A function for generate seed,
 * this should return different value every time it called.
 *
 * @public
 */
export type SeedFn = () => number;

/**
 * A seed builder to build function based on input value.
 *
 * @public
 */
export type SeedBuilder = (input: string) => SeedFn;

/**
 * A patch function to modify seed value after it generated.
 *
 * @public
 */
export type SeedPatch = (n: number) => number;

/**
 * Seed interface, All seed class must implement this interface.
 *
 * @public
 */
export interface ISeed {
  /**
   * copy seed to new instance.
   *
   * @param input - input for new seed
   * @param builder - seed builder
   * @returns new seed
   *
   * @public
   */
  copy(input: string, builder?: SeedBuilder): ISeed;

  /**
   * get seed value.
   *
   * @param patch - patch function
   */
  value(patch?: SeedPatch): number;
}
