import { toArray } from "./array";

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
});
