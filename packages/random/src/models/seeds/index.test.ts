import { SeedFixed, SeedXfnv1a, SeedXmur3 } from ".";

describe("Predefined seed", () => {
  test.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [10, 10],
    [1.112, 1.112],
    [123, 123],
    [123.99, 123.99],
  ])("Fixed: Fixed(%s).getSeed() return %s", (index, expected) => {
    const f = new SeedFixed(index);
    expect(f.value()).toBeCloseTo(expected, 5);
  });

  test.each([
    ["text", 824_417_223, 1_684_408_431],
    ["string", 3_903_872_657, 3_114_980_239],
    ["number", 1_793_145_994, 4_017_401_038],
    ["", 1_493_338_014, 2_822_906_736],
    ["boolean", 4_108_559_831, 723_513_985],
  ])("XFNV1A: Xfnv1a(%s).getSeed() return %s", (index, expected, k) => {
    const x = new SeedXfnv1a(index);
    expect(x.value()).toBeCloseTo(expected, 4);
    expect(x.value()).toBeCloseTo(k, 4);

    const y = new SeedXfnv1a(index);
    expect(y.value()).toBeCloseTo(expected, 4);
  });

  test("XFNV1A: Average of result random number will be the sum (approximately +- 1000)", () => {
    const inputString = `My secretary is the only person who
truly understands my stamp-collecting obsession.`;
    const size = 500;

    /**
     * This magic number depend on input string for hashing and recursive size
     */
    const magicNumber = 2_155_928_635;
    const round = 1;

    const a = new SeedXfnv1a(inputString);

    let sum = 0;
    for (let index = 0; index < size; index++) {
      sum += a.value();
    }
    const result = sum / size;

    expect(result).toBeGreaterThanOrEqual(magicNumber - round);
    expect(result).toBeLessThanOrEqual(magicNumber + round);
  });

  test.each([
    ["text", 549_197_882, 228_113_408],
    ["string", 3_171_331_317, 2_532_059_804],
    ["number", 2_173_514_142, 3_761_507_789],
    ["", 167_010_153, 2_610_615_433],
    ["boolean", 2_579_961_042, 19_056_677],
  ])("XMUR3: Xmur3(%s).getSeed() return %s", (index, expected, k) => {
    const x = new SeedXmur3(index);
    expect(x.value()).toBeCloseTo(expected, 4);
    expect(x.value()).toBeCloseTo(k, 4);

    const y = new SeedXmur3(index);
    expect(y.value()).toBeCloseTo(expected, 4);
  });

  test("XMUR3: Average of result random number will be the sum (approximately +- 1000)", () => {
    const inputString = `There's a growing trend among
teenagers of using frisbees as go-cart wheels.`;
    const size = 500;

    /**
     * This magic number depend on input string for hashing and recursive size
     */
    const magicNumber = 2_132_101_816;
    const round = 1;

    const a = new SeedXmur3(inputString);

    let sum = 0;
    for (let index = 0; index < size; index++) {
      sum += a.value();
    }
    const result = sum / size;

    expect(result).toBeGreaterThanOrEqual(magicNumber - round);
    expect(result).toBeLessThanOrEqual(magicNumber + round);
  });
});
