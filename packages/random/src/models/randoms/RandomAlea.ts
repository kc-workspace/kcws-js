import type { ISeed } from "../ISeed";

import { Random } from "../Random";

/**
 * Random Alea is based on MWC (Multiply-with-Carry). It includes its own string hash function: Mash.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#alea
 *
 * @public
 */
export class RandomAlea extends Random {
  private _n: number = 4_022_871_197;
  private _a: number = this._mash(" ");
  private _b: number = this._mash(" ");
  private _c: number = this._mash(" ");

  private _x: number = 1;
  private _y: number = 0;

  public constructor(seed: ISeed) {
    super(seed);

    const seedString = this.getSeed().toString();
    this._a -= this._mash(seedString);
    this._b -= this._mash(seedString);
    this._c -= this._mash(seedString);

    if (this._a < 0) this._a++;
    if (this._b < 0) this._b++;
    if (this._c < 0) this._c++;
  }

  public pseudo(): number {
    this._y = this._x * 2.328_306_436_538_696_3e-10 + this._a * 2_091_639;
    this._a = this._b;
    this._b = this._c;
    this._x = Math.trunc(this._y);
    this._c = this._y - this._x;

    return this._c;
  }

  public copy(s?: ISeed): Random {
    return new RandomAlea(s ?? this.seed);
  }

  /**
   * create mash from seed.
   *
   * @param seed - seed string
   * @returns mash from seed
   */
  private _mash(seed: string): number {
    let t;
    let s;
    let f;
    const magic = 0.025_196_032_824_169_38;
    for (let u = 0; u < seed.length; u++) {
      s = seed.charCodeAt(u);
      this._n += s;
      f = magic * this._n - Math.trunc(this._n * magic);
      t = f * Math.trunc(magic * this._n);
      this._n = 4_294_967_296 * (t - Math.trunc(t)) + Math.trunc(t);
    }
    return Math.trunc(this._n) * 2.328_306_436_538_696_3e-10;
  }
}
