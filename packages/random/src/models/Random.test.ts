import {
  getRandomDynamicStringOption,
  getRandomFixedStringOption,
  getRandomFloatOption,
  getRandomIntOption,
  getRandomNumberOption,
} from "../utils/option";
import { RandomWeightedOption } from "./IOptions";
import { ISeed } from "./ISeed";
import { Random } from "./Random";
import { SeedFixed } from "./seeds";

class RandomImpl extends Random {
  public pseudo(): number {
    return this.seed.value();
  }
  public copy(seed: ISeed): Random {
    return new RandomImpl(seed);
  }
}

describe("Random", () => {
  const baseRand = new RandomImpl(new SeedFixed(0.1));

  it("random boolean", () => {
    expect(baseRand.boolean()).toEqual(false);
    expect(baseRand.copy(new SeedFixed(0.6)).boolean()).toEqual(true);
  });

  it("random float", () => {
    expect(baseRand.float()).toEqual(0.1);
  });
  it.each([
    [getRandomFloatOption(), 0.1, 0.1],
    [getRandomFloatOption(), 0.5, 0.5],
    [getRandomFloatOption(), 0.9, 0.9],
    // Because default value of min-max is 0-1
    // so program will swap min=10 to min-max 1-10
    [getRandomFloatOption({ min: 10 }), 0.9, 9.1],
    [getRandomFloatOption({ min: 5, max: 5 }), 0.2, 5],
  ])("random float with options %p (s=%d)", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.float(opt)).toEqual(output);
  });

  it("random int", () => {
    expect(baseRand.int()).toEqual(1);
    expect(baseRand.copy(new SeedFixed(0.5)).int()).toEqual(5);
    expect(baseRand.copy(new SeedFixed(0.9)).int()).toEqual(9);
  });
  it.each([
    [getRandomIntOption(), 0.1, 1],
    [getRandomIntOption(), 0.5, 5],
    [getRandomIntOption(), 0.9, 9],
    [getRandomIntOption({ maxInclusive: true }), 0.91, 10],
    [getRandomIntOption({ min: 500 }), 0.75, 377],
    [getRandomIntOption({ min: 5, max: 5 }), 0.2, 5],
  ])("random int with options %p (s=%d)", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.int(opt)).toEqual(output);
  });

  it.each([
    [getRandomNumberOption(), 0.5, 0.5],
    [getRandomNumberOption({ integerMode: true }), 0.5, 5],
    [getRandomNumberOption({ integerMode: false }), 0.5, 0.5],
  ])("random number with option %p (s=%d)", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.number(opt)).toEqual(output);
  });

  it.each([
    [getRandomFixedStringOption(), 0.121, "hhhhhhhhhh"],
    [getRandomFixedStringOption(), 0.122, "hhhhhhhhhh"],
    [getRandomFixedStringOption(), 0.13, "iiiiiiiiii"],
    [getRandomFixedStringOption(), 0.131, "iiiiiiiiii"],
    [getRandomFixedStringOption(), 0.14, "iiiiiiiiii"],
    [getRandomFixedStringOption(), 0.5, "FFFFFFFFFF"],
    [getRandomFixedStringOption(), 0.9, "4444444444"],
    [getRandomFixedStringOption({ length: 1 }), 0.9, "4"],
  ])("random string with option %p (s=%d)", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.fixedString(opt)).toEqual(output);
  });

  it.each([
    [getRandomDynamicStringOption(), 0.121, "hhhhhhhh"],
    [getRandomDynamicStringOption(), 0.122, "hhhhhhhh"],
    [getRandomDynamicStringOption({ min: 5, max: 10 }), 0.9, "444444444"],
    [
      getRandomDynamicStringOption({ min: 500, max: 1000 }),
      0.155,
      "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    ],
  ])("random string with option %p (s=%d)", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.dynamicString(opt)).toEqual(output);
  });

  it.each([
    [{ whitelist: [1, 2, 3, 4] }, 0.15, [2, 3, 4, 1]],
    [{ whitelist: [1, 2, 3, 4] }, 0.51, [1, 4, 2, 3]],
    [{ whitelist: [1, 2, 3, 4] }, 0.52, [1, 4, 2, 3]],
  ])("randomly shuffle input whitelist", (opt, seed, output) => {
    const rand = baseRand.copy(new SeedFixed(seed));
    expect(rand.shuffle(opt)).toEqual(output);
  });

  describe("Weighted random", () => {
    const data = [
      { weight: 99, value: 0 },
      { weight: 1, value: 1 },
    ];

    const cases = Array.from<number>({ length: 100 })
      .fill(100)
      .map(
        (divider, index) =>
          [data, index / divider, index === 99 ? 1 : 0] as [
            Array<RandomWeightedOption<number>>,
            number,
            number,
          ]
      );

    it.each(cases)(
      "random value by weight options %p (s=%d)",
      (options, seed, output) => {
        const rand = baseRand.copy(new SeedFixed(seed));
        expect(rand.weighted(...options)).toEqual(output);
      }
    );
  });
});
