import { isObject } from "./object";

describe("Object", () => {
  test.each([
    [{}, true],
    // eslint-disable-next-line no-new-object
    [new Object(), true],
    // eslint-disable-next-line no-new-object
    [new Object({}), true],
    [undefined, false],
    [null, false],
    ["", false],
    [50, false],
    [1.11, false],
    [false, false],
    // eslint-disable-next-line no-new-object
    [new Object([]), false],
    [Symbol(""), false],
  ])("is '%p' object? %s", (input, output) => {
    expect(isObject<unknown>(input)).toEqual(output);
  });
});
