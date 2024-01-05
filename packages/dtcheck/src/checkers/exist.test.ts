import { isExist, isNotExist } from "./exist";

describe("Exist", () => {
  it.each([
    ["", true],
    [0, true],
    [false, true],
    [true, true],
    [{}, true],
    [[], true],
    [Symbol(), true],
    [() => {}, true],
    [undefined, false],
    [null, false],
  ])("is '%p' existed? %s", (input, output) => {
    expect(isExist(input)).toEqual(output);
    expect(isNotExist(input)).toEqual(!output);
  });
});
