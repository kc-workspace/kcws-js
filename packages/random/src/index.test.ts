import { RandomAlea, SeedTimestamp } from ".";

describe("hello", () => {
  it("should return hello world", () => {
    const rand = new RandomAlea(new SeedTimestamp());
    expect(rand.int({ min: 1, max: 10 })).toBeGreaterThan(0);
  });
});
