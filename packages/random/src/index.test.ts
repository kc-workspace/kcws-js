import { RandomAlea, SeedTimestamp } from ".";

describe("Random alea", () => {
  it("should return number within random range", () => {
    const rand = new RandomAlea(new SeedTimestamp());
    expect(rand.int({ min: 1, max: 10 })).toBeGreaterThan(0);
  });
});
