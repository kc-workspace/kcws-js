import { isArray } from "./array";

describe("Array", () => {
  test.each([
    [[], true],
    [[1, 2, 3], true],
    [[1, "2", false], true],
    [undefined, false],
    [null, false],
    ["", false],
    [50, false],
    [1.11, false],
    [false, false],
    [{}, false],
    // eslint-disable-next-line no-new-object
    [new Object(), false],
    // eslint-disable-next-line no-new-object
    [new Object([]), true],
    [Symbol(""), false],
  ])("is '%p' array? %s", (input, output) => {
    expect(isArray<unknown>(input)).toEqual(output);
  });
});
