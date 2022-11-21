import { isSameArray, toArray } from "./array";

describe("array utilities", () => {
  it.each([
    [undefined, []],
    ["test", ["test"]],
    [
      ["test1", "test2"],
      ["test1", "test2"],
    ],
    [500, [500]],
  ])("convert %p to %p", (input, output) => {
    expect(toArray(input)).toEqual(output);
  });

  it.each([
    [[], [], true],
    [[1], [1], true],
    [[1, 2], [2, 1], true],
    [[1, 2], [2], false],
    [["2"], [2], false],
  ])("is %p same as %p: %s", (a1, a2, answer) => {
    expect(isSameArray(a1, a2)).toEqual(answer);
  });
});
