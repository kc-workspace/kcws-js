import { isFloat, isInteger, isNumber } from "./number";

describe("Number", () => {
  test.each([
    [0, true],
    [-0, true],
    [124, true],
    [-124, true],
    [124.0, true],
    [-124.0, true],
    [12.4, true],
    [-12.4, true],
    [NaN, false],
    [Infinity, false],
    ["", false],
    ["exist", false],
    [undefined, false],
    [null, false],
    [false, false],
    [{}, false],
    [{ a: "test" }, false],
    // eslint-disable-next-line no-new-object
    [new Object([]), false],
    [Symbol(""), false],
  ])("is '%p' number? %s", (input, output) => {
    expect(isNumber(input)).toEqual(output);
  });

  test.each([
    [NaN, false, false],
    [Infinity, false, false],
    [NaN, true, true],
    [Infinity, true, true],
    [0, false, true],
    [-0, false, true],
    [0, true, true],
    [-0, true, true],
  ])(
    "is '%p' number (ignore-special=%s)? %s",
    (input, ignoreSpecial, output) => {
      expect(isNumber(input, ignoreSpecial)).toEqual(output);
    }
  );

  test.each([
    [0, true],
    [-0, true],
    [124, true],
    [-124, true],
    [124.0, true],
    [-124.0, true],
    [12.4, false],
    [-12.4, false],
    [undefined, false],
    [null, false],
  ])("is '%p' number is integer? %s", (input, output) => {
    expect(isInteger(input)).toEqual(output);
  });

  test.each([
    [0, false],
    [-0, false],
    [124, false],
    [-124, false],
    [124.0, false],
    [-124.0, false],
    [12.4, true],
    [-12.4, true],
    [undefined, false],
    [null, false],
  ])("is '%p' number is float? %s", (input, output) => {
    expect(isFloat(input)).toEqual(output);
  });
});
