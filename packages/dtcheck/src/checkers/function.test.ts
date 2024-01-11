import { isFunction } from "./function";

describe("String", () => {
  test.each([
    [() => {}, true],
    [() => true, true],
    [undefined, false],
    [null, false],
    [new Object(), false],
    [new Object(123), false],
    [0, false],
    [false, false],
    [{}, false],
    [Symbol(""), false],
  ])("is '%p' function? %s", (input, output) => {
    expect(isFunction(input)).toEqual(output);
  });
});
