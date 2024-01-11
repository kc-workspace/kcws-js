import { isObject } from "./object";

describe("Object", () => {
  test.each([
    [{}, true],
    [new Object(), true],
    [new Object({}), true],
    [undefined, false],
    [null, false],
    ["", false],
    [50, false],
    [1.11, false],
    [false, false],
    [new Object([]), false],
    [Symbol(""), false],
  ])("is '%p' object? %s", (input, output) => {
    expect(isObject<unknown>(input)).toEqual(output);
  });
});
