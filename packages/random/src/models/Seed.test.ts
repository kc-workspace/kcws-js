import { Seed } from "./Seed";

describe("Seed", () => {
  it("constant seed", () => {
    const seed = new Seed("", () => () => 1);
    expect(seed.value()).toEqual(1);
    expect(seed.value()).toEqual(1);
  });

  it("constant seed with patch", () => {
    const seed = new Seed("", () => () => 1);
    expect(seed.value()).toEqual(1);
    expect(seed.value((i) => i + 1)).toEqual(2);
    expect(seed.value((i) => i + 1)).toEqual(2);
  });

  it("dynamic seed", () => {
    const seed = new Seed("", () => {
      const array = [1, 2, 3, 4, 5, 6];
      let i = 0;

      return () => {
        const out = array[i];
        i = i < array.length - 1 ? i + 1 : 0;
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
    const seed = new Seed("123", (i) => () => parseInt(i));
    expect(seed.value()).toEqual(123);

    const newSeed = seed.copy("555");
    expect(newSeed.value()).toEqual(555);
  });

  it("full copy vs seed constructor", () => {
    const baseSeed = new Seed("123", (i) => () => parseInt(i));

    const newSeed = new Seed("a", (i) => () => i.charCodeAt(0));
    const copiedSeed = baseSeed.copy("a", (i) => () => i.charCodeAt(0));

    expect(newSeed.value()).toEqual(copiedSeed.value());
  });
});
