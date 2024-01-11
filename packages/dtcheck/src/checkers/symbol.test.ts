import { isSymbol } from "./symbol";

describe("String", () => {
  test.each([
    [Symbol(""), true],
    [Symbol(123), true],
    [Symbol(undefined), true],
    [() => {}, false],
    [() => true, false],
    [undefined, false],
    [null, false],
    [new Object(), false],
    [new Object(123), false],
    [0, false],
    [false, false],
    [{}, false],
  ])("is '%p' symbol? %s", (input, output) => {
    expect(isSymbol(input)).toEqual(output);
  });
});
