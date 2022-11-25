import type { ISeed, SeedBuilder, SeedFn, SeedPatch } from "./ISeed";

/**
 * Base seed class. This can be extends for simplify seed class.
 *
 * @public
 */
export class Seed implements ISeed {
  private readonly _fn: SeedFn;
  private readonly _builder: SeedBuilder;

  /**
   * create new seed instance.
   *
   * @param input - seed input value
   * @param builder - seed builder
   *
   */
  public constructor(input: string, builder: SeedBuilder) {
    this._fn = builder(input);
    this._builder = builder;
  }

  /**
   * {@inheritDoc ISeed.copy}
   */
  public copy(input: string, builder?: SeedBuilder | undefined): ISeed {
    return new Seed(input, builder ?? this._builder);
  }

  /**
   * {@inheritDoc ISeed.value}
   */
  public value(patch?: SeedPatch): number {
    const out = this._fn();
    return patch ? patch(out) : out;
  }
}
