import { Random } from "../models/Random";
import { SeedFixed } from "../seeds/SeedFixed";

/**
 * simple random algorithm.
 *
 * @remarks
 *
 * You should use this random for testing only,
 * Since it will always return fixed range of value,
 * no matter how many times we called.
 *
 * @public
 */
export class RandomSimple extends Random {
  private _whitelist: Array<number>;
  private _pointer: number;

  public constructor() {
    super(new SeedFixed(10));

    this._whitelist = [0, 0.2, 0.4, 0.6, 0.8, 0.99];
    this._pointer = 0;
  }

  public pseudo(): number {
    const current = this._whitelist[this._pointer];
    this._nextPointer();
    return current;
  }

  public copy(): Random {
    return new RandomSimple();
  }

  private _nextPointer(): void {
    this._pointer++;
    if (this._pointer === this._whitelist.length) {
      this._pointer = 0;
    }
  }
}
