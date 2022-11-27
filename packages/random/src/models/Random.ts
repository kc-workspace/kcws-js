import type {
  RandomDynamicStringOption,
  RandomFixedStringOption,
  RandomFloatOption,
  RandomIntOption,
  RandomMultipleValueOption,
  RandomNumberOption,
  RandomSelectOption,
  RandomStringOption,
  RandomWeightedOption,
} from "./Options";

import type { IRandom } from "./IRandom";
import type { ISeed, SeedPatch } from "./ISeed";

import { alphanumeric } from "../constants/whitelist";

/**
 * Base random implementation,
 * this include all utilities around random
 * using {@link Random.pseudo} function to generate
 * random value.
 *
 * @beta
 */
export abstract class Random implements IRandom {
  protected seed: ISeed;

  /**
   * Create new random instance.
   *
   * @param seed - random seed
   *
   * @beta
   */
  public constructor(seed: ISeed) {
    this.seed = seed;
  }

  /**
   * random boolean, the result can be either true or false.
   *
   * @returns randomed boolean
   *
   * @beta
   */
  public boolean(): boolean {
    return this.int({ min: 0, max: 1, maxInclusive: true }) === 1;
  }

  /**
   * random integer number based from input option.
   *
   * @param option - random option
   * @returns integer number
   *
   * @beta
   */
  public int(option?: Partial<RandomIntOption>): number {
    const _option: RandomIntOption = {
      min: Math.floor(option?.min ?? 0),
      max: Math.floor(option?.max ?? 10),
      maxInclusive: option?.maxInclusive ?? false,
    };
    if (_option.min === _option.max) return _option.min;

    const maxShift = _option.maxInclusive ? 1 : 0;
    const min = Math.min(_option.min, _option.max);
    const max = Math.max(_option.min, _option.max) + maxShift;

    const diff = max - min;
    const out = this.pseudo() * diff + min;
    return Math.floor(out);
  }

  /**
   * random float number based from input option.
   *
   * @param option - random option
   * @returns float number
   *
   * @beta
   */
  public float(option?: Partial<RandomFloatOption>): number {
    const _option: RandomFloatOption = {
      min: option?.min ?? 0,
      max: option?.max ?? 1,
    };

    const min = Math.min(_option.min, _option.max);
    const max = Math.max(_option.min, _option.max);
    if (min === max) return min;

    const diff = max - min;
    return this.pseudo() * diff + min;
  }

  /**
   * random either integer or float number based from input option.
   * default mode is float.
   *
   * @param option - random option
   * @returns number
   *
   * @beta
   */
  public number(option?: Partial<RandomNumberOption>): number {
    if (option?.integerMode) return this.int(option);
    else return this.float(option);
  }

  /**
   * random fixed size string from input option.
   *
   * @param option - random option
   * @returns string
   *
   * @beta
   */
  public fixedString(option?: Partial<RandomFixedStringOption>): string {
    const _option: RandomFixedStringOption = {
      length: option?.length ?? 10,
      whitelist: option?.whitelist ?? alphanumeric,
    };

    let result = "";
    for (let i = 0; i < _option.length; i++) {
      const index = this.int({ min: 0, max: _option.whitelist.length });
      result += _option.whitelist.at(index);
    }
    return result;
  }

  /**
   * random dynamic size string from input option.
   *
   * @param option - random option
   * @returns string
   *
   * @beta
   */
  public dynamicString(option?: Partial<RandomDynamicStringOption>): string {
    const whitelist = option?.whitelist ?? alphanumeric;
    const length = this.int({
      min: Math.min(option?.min ?? 1, whitelist.length),
      max: Math.max(option?.max ?? 100, whitelist.length),
      maxInclusive: option?.maxInclusive ?? false,
    });

    return this.fixedString({ length, whitelist: whitelist });
  }

  /**
   * random either dynamic or fixed size of string
   * depends on input option.
   *
   * @param option - random option
   * @returns string
   *
   * @beta
   */
  public string(option?: Partial<RandomStringOption>): string {
    if (!option) return this.fixedString();
    else if ("length" in option) return this.fixedString(option);
    else return this.dynamicString(option);
  }

  /**
   * randomly select value from input whitelist.
   *
   * @param option - random option
   * @returns value from input array
   *
   * @beta
   */
  public select<T>(option: RandomSelectOption<T>): T {
    const index = this.number({ min: 0, max: option.whitelist.length });
    return option.whitelist.at(index)!;
  }

  /**
   * randomly shuffle input whitelist
   *
   * @param option - random option
   * @returns shuffled array
   *
   * @beta
   */
  public shuffle<T>(option: RandomMultipleValueOption<T>): Array<T> {
    const length = option.whitelist.length;
    const output = option.whitelist.slice();
    for (let i = length - 1; i > 0; i--) {
      const j = this.int({ max: i + 1 });
      [output[i], output[j]] = [output[j], output[i]];
    }

    return output;
  }

  /**
   * randomly select value based on weighted number.
   *
   * @param options - weighted value
   * @returns value from input
   *
   * @beta
   */
  public weighted<T>(...options: Array<RandomWeightedOption<T>>): T {
    const totalWeighted = options.reduce((p, { weight }) => p + weight, 0);

    let chance = this.int({ min: 0, max: totalWeighted });
    for (const value of options) {
      if (chance < value.weight) {
        return value.value;
      }
      chance -= value.weight;
    }

    // This should never been called
    throw new Error("Something wrong with weighted function");
  }

  /**
   * get latest seed number
   *
   * @param p - patch function
   * @returns seed number
   *
   * @internal
   */
  protected getSeed(p?: SeedPatch): number {
    return this.seed.value(p);
  }

  public abstract pseudo(): number;
  public abstract copy(seed: ISeed): IRandom;
}
