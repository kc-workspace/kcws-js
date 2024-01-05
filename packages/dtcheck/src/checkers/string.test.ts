import { isString } from "./string";

describe("String", () => {
  test.each([
    ["", true],
    ["exist", true],
    [undefined, false],
    [null, false],
    [false, false],
    [0, false],
    [124, false],
    [{}, false],
    [{ a: "test" }, false],
    // eslint-disable-next-line no-new-object
    [new Object([]), false],
    [Symbol(""), false],
  ])("is '%p' string? %s", (input, output) => {
    expect(isString(input)).toEqual(output);
  });
});
