import { isBoolean } from "./boolean";

describe("Boolean", () => {
  it.each([
    [true, true],
    [false, true],
    [undefined, false],
    [null, false],
    ["", false],
    ["true", false],
    ["false", false],
    ["t", false],
    ["True", false],
    ["faLsE", false],
    ["1", false],
    ["0", false],
    [1, false],
    [0, false],
    [{}, false],
    [[], false],
    [() => {}, false],
    [() => 1, false],
    [() => true, false],
    [() => false, false],
    // eslint-disable-next-line no-new-object
    [new Object(true), false],
    // eslint-disable-next-line no-new-object
    [new Object(false), false],
    [Symbol(), false],
    [Symbol("true"), false],
    [Symbol("false"), false],
    [Symbol(1), false],
    [Symbol(undefined), false],
  ])("is '%p' boolean? %s", (input, output) => {
    expect(isBoolean(input)).toEqual(output);
  });

  it.each([
    [true, true],
    [false, true],
    ["true", true],
    ["false", true],
    ["t", true],
    ["True", true],
    ["FALSE", true],
    ["1", true],
    ["0", true],
    [1, true],
    [0, true],
    [BigInt(0), true],
    [BigInt(1), true],
    [() => true, true],
    [() => false, true],
    [undefined, false],
    [null, false],
    ["", false],
    ["faLsE", false],
    ["tRUE", false],
    [{}, false],
    [[], false],
    [() => {}, false],
    // eslint-disable-next-line no-new-object
    [new Object(true), false],
    // eslint-disable-next-line no-new-object
    [new Object(false), false],
    [Symbol(), false],
    [Symbol("true"), false],
    [Symbol("false"), false],
    [Symbol(1), false],
    [Symbol(undefined), false],
  ])("is '%p' boolean (loose)? %s", (input, output) => {
    expect(isBoolean(input, true)).toEqual(output);
  });
});
