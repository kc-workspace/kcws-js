import type { ISeed } from "../models/ISeed";
import { Random } from "../models/Random";

/**
 * Random Alea is based on MWC (Multiply-with-Carry). It includes its own string hash function: Mash.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#alea
 *
 * @public
 */
export class RandomAlea extends Random {
  private _n: number = 4022871197;
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
    this._y = this._x * 2.3283064365386963e-10 + this._a * 2091639;
    this._a = this._b;
    this._b = this._c;
    this._x = this._y | 0;
    this._c = this._y - this._x;

    return this._c;
  }

  public copy(s?: ISeed): Random {
    return new RandomAlea(s ?? this.seed);
  }

  private _mash(seed: string): number {
    let t;
    let s;
    let f;
    const e = 0.02519603282416938;
    for (let u = 0; u < seed.length; u++) {
      s = seed.charCodeAt(u);
      this._n += s;
      f = e * this._n - ((this._n * e) | 0);
      t = f * ((e * this._n) | 0);
      this._n = 4294967296 * (t - (t | 0)) + (t | 0);
    }
    return (this._n | 0) * 2.3283064365386963e-10;
  }
}
