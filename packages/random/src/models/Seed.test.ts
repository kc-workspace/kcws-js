import { Seed } from "./Seed";

const const1 = () => 1;

describe("Seed", () => {
  it("constant seed", () => {
    const seed = new Seed("", () => const1);
    expect(seed.value()).toEqual(1);
    expect(seed.value()).toEqual(1);
  });

  it("constant seed with patch", () => {
    const seed = new Seed("", () => const1);
    expect(seed.value()).toEqual(1);
    expect(seed.value(index => index + 1)).toEqual(2);
    expect(seed.value(index => index + 1)).toEqual(2);
  });

  it("dynamic seed", () => {
    const seed = new Seed("", () => {
      const array = [1, 2, 3, 4, 5, 6];
      let index = 0;

      return () => {
        const out = array[index];
        index = index < array.length - 1 ? index + 1 : 0;
        return out;
      };
    });

    expect(seed.value()).toEqual(1);
    expect(seed.value()).toEqual(2);
    expect(seed.value()).toEqual(3);
    expect(seed.value()).toEqual(4);
    expect(seed.value()).toEqual(5);
    expect(seed.value()).toEqual(6);
    expect(seed.value()).toEqual(1);
  });

  it("copy seed", () => {
    const seed = new Seed("123", index => () => Number.parseInt(index));
    expect(seed.value()).toEqual(123);

    const newSeed = seed.copy("555");
    expect(newSeed.value()).toEqual(555);
  });

  it("full copy vs seed constructor", () => {
    const baseSeed = new Seed("123", index => () => Number.parseInt(index));

    const newSeed = new Seed("a", index => () => index.charCodeAt(0));
    const copiedSeed = baseSeed.copy("a", index => () => index.charCodeAt(0));

    expect(newSeed.value()).toEqual(copiedSeed.value());
  });
});
