import type { ISeed } from "../ISeed";

import { Random } from "../Random";

/**
 * Random Xoshiro128** included in Xoshiro family.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#xoshiro
 *
 * @public
 */
export class RandomXoshiro128SS extends Random {
  private _a: number;
  private _b: number;
  private _c: number;
  private _d: number;

  public constructor(seed: ISeed) {
    super(seed);
    this._a = this.getSeed();
    this._b = this.getSeed();
    this._c = this.getSeed();
    this._d = this.getSeed();
  }

  public pseudo(): number {
    const t = this._b << 9;
    let r = this._a * 5;
    /* eslint-disable-next-line no-bitwise */
    r = ((r << 7) | (r >>> 25)) * 9;
    this._c = this._c ^ this._a;
    this._d = this._d ^ this._b;
    this._b = this._b ^ this._c;
    this._a = this._a ^ this._d;
    this._c = this._c ^ t;
    /* eslint-disable-next-line no-bitwise */
    this._d = (this._d << 11) | (this._d >>> 21);
    return (r >>> 0) / 4_294_967_296;
  }

  public copy(s?: ISeed): Random {
    return new RandomXoshiro128SS(s ?? this.seed);
  }
}
