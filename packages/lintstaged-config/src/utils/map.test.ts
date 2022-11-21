import { isSameMap } from "./map";

describe("map utilities", () => {
  it.each([
    [new Map().set("a", "b"), new Map().set("a", "b"), true],
    [new Map().set(5, false), new Map().set(5, false), true],
    [new Map().set("500", 55), new Map().set("500", 54), false],
  ])("is %p same as %p: %s", (a1, a2, answer) => {
    expect(isSameMap(a1, a2)).toEqual(answer);
  });
});
