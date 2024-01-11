import { isBigInteger, isFloat, isInteger, isNumber } from "./number";

describe("Number", () => {
  test.each([
    [0, true],
    [-0, true],
    [124, true],
    [-124, true],
    [124, true],
    [-124, true],
    [12.4, true],
    [-12.4, true],
    [new Object(123), true],
    [new Object(-321), true],
    // eslint-disable-next-line unicorn/new-for-builtins
    [Object(999), true],
    [Number.NaN, false],
    [Number.POSITIVE_INFINITY, false],
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
    [Number.NaN, false, false],
    [Number.POSITIVE_INFINITY, false, false],
    [Number.NaN, true, true],
    [Number.POSITIVE_INFINITY, true, true],
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
    [1n, true],
    [999_999_999_999_999n, true],
    [BigInt("123"), true],
    [BigInt(123), true],
    [BigInt(123n), true],
    [BigInt(false), true],
    [new Object(123n), true],
    [new Object(BigInt(123n)), true],
    [0, false],
    [-0, false],
    [124, false],
    [-124, false],
    [12.4, false],
    [-12.4, false],
    [undefined, false],
    [null, false],
    [new Object(false), false],
  ])("is '%p' number is big integer? %s", (input, output) => {
    expect(isBigInteger(input)).toEqual(output);
  });

  test.each([
    [0, true],
    [-0, true],
    [124, true],
    [-124, true],
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
    [12.4, true],
    [-12.4, true],
    [undefined, false],
    [null, false],
  ])("is '%p' number is float? %s", (input, output) => {
    expect(isFloat(input)).toEqual(output);
  });
});
