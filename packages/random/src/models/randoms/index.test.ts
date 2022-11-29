import type { Random } from "../Random";

import { SeedFixed, SeedXfnv1a, SeedXmur3 } from "../seeds";
import {
  RandomAlea,
  RandomXoshiro128PP,
  RandomXoshiro128SS,
  RandomSimple,
} from ".";

export class Result {
  private _map: Map<number, number>;

  public constructor(map: Map<number, number>) {
    this._map = map;
  }

  public check(threshold: number = 0.1): Array<Error> {
    const errors: Array<Error> = [];
    const array = Array.from(this._map.entries());

    const firstElement = array.shift();
    if (firstElement) {
      const base = firstElement[1];
      const max = base + threshold;
      const min = base - threshold;

      array.forEach((key) => {
        const [index, value] = key;
        if (value < min || value > max) {
          errors.push(
            new Error(
              `The result not distribute correctly` +
                `on index ${index} not in length ` +
                `(max) ${max} > ${value} > ${min} (min)`
            )
          );
        }
      });
    } else {
      errors.push(new Error(`The map is empty`));
    }

    return errors;
  }
}

export class Range {
  public static new(r: Random): Range {
    return new Range(r);
  }

  private _rand: Random;
  public constructor(rand: Random) {
    this._rand = rand;
  }

  public average(time: number = 1000, max?: number): Result {
    if (!max) max = time / 100;
    const map = new Map<number, number>();
    for (let index = 0; index < time; index++) {
      const e = this._rand.int({ min: 1, max, maxInclusive: true });
      map.set(e, map.get(e) ?? 1);
    }

    return new Result(map);
  }
}

// We ignore jscpd here because
// most tests are similar and it
// trigger error on jscpd.
/* jscpd:ignore-start */
describe("Random constants", () => {
  test.each([
    [1000000, 7],
    [0, 6],
    [-1000000, 1],
  ])("Alea: Random with Seed(%s) will return %s", (i, o) => {
    const r = new RandomAlea(new SeedFixed(i));
    expect(r.int({ min: 1, max: 10, maxInclusive: true })).toBeCloseTo(o, 2);
  });

  test("Alea: copy return new object", () => {
    const r = new RandomAlea(new SeedFixed(1));
    const rr = r.copy(new SeedFixed(2));
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0.526047095656395, 8);
    expect(r.pseudo()).toBeCloseTo(0.12264361372217536, 8);
    expect(rr.pseudo()).toBeCloseTo(0.4575677579268813, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.526047095656395, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.12264361372217536, 8);
  });
  test(
    "Alea: The return value of 1000 times " +
      "should be average with 0.01 error",
    () => {
      const r = new RandomAlea(new SeedXmur3("1000 times"));
      const errors = Range.new(r).average(10000, 75).check(0.01);
      if (errors.length > 0) fail(errors);
    }
  );

  test.each([
    [1000000, 1],
    [0, 1],
    [-1000000, 10],
  ])("Xoshiro128PP: Random with Seed(%s) will return %s", (i, o) => {
    const r = new RandomXoshiro128PP(new SeedFixed(i));
    expect(r.int({ min: 1, max: 10, maxInclusive: true })).toBeCloseTo(o, 2);
  });
  test("Xoshiro128PP: copy return new object", () => {
    const r = new RandomXoshiro128PP(new SeedFixed(50000000));
    const rr = r.copy(new SeedFixed(100000000));
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0.991873771417886, 8);
    expect(rr.pseudo()).toBeCloseTo(0.9837475430686027, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.991873771417886, 8);
  });
  test(
    "Xoshiro128PP: The return value of 1000 times " +
      "should be average with 0.01 error",
    () => {
      const r = new RandomXoshiro128PP(new SeedXfnv1a("1000 times"));
      const errors = Range.new(r).average(10000, 75).check(0.01);
      if (errors.length > 0) fail(errors);
    }
  );

  test.each([
    [1000000, 4],
    [0, 1],
    [-1000000, 7],
  ])("Xoshiro128SS: Random with Seed(%s) will return %s", (i, o) => {
    const r = new RandomXoshiro128SS(new SeedFixed(i));
    expect(r.int({ min: 1, max: 10, maxInclusive: true })).toBeCloseTo(o, 2);
  });
  test("Xoshiro128SS: copy return new object", () => {
    const r = new RandomXoshiro128SS(new SeedFixed(50000000));
    const rr = r.copy(new SeedFixed(100000000));
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0.055225386982783675, 8);
    expect(rr.pseudo()).toBeCloseTo(0.11045077396556735, 8);
    expect(rrr.pseudo()).toBeCloseTo(0.055225386982783675, 8);
  });
  test(
    "Xoshiro128SS: The return value of 10000 times " +
      "should be average with 0.01 error",
    () => {
      const r = new RandomXoshiro128SS(new SeedXfnv1a("1000 times"));
      const errors = Range.new(r).average(10000, 75).check(0.01);
      if (errors.length > 0) fail(errors);
    }
  );

  test.each([[1], [1], [1]])("Simple: Random will return %s", (o) => {
    const r = new RandomSimple();
    const out = r.int({ min: 1, max: 10, maxInclusive: true });
    expect(out).toEqual(o);
  });
  test("Simple: copy return new object", () => {
    const r = new RandomSimple();
    const rr = r.copy();
    const rrr = r.copy();

    expect(r.pseudo()).toBeCloseTo(0, 1);
    expect(r.pseudo()).toBeCloseTo(0.2, 1);
    expect(rr.pseudo()).toBeCloseTo(0, 1);
    expect(rr.pseudo()).toBeCloseTo(0.2, 1);
    expect(rrr.pseudo()).toBeCloseTo(0, 1);
    expect(rrr.pseudo()).toBeCloseTo(0.2, 1);
  });
  test(
    "Simple: The return value of 1000 times " +
      "should be average with 0.01 error",
    () => {
      const r = new RandomSimple();
      const errors = Range.new(r)
        .average(6 * 125, 6 * 100)
        .check(0.1);
      if (errors.length > 0) fail(errors);
    }
  );
});
/* jscpd:ignore-end */
