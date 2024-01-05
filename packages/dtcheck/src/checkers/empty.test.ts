import { isEmpty, isNotEmpty } from "./empty";

describe("Empty", () => {
  it.each([
    ["", true],
    [{}, true],
    // eslint-disable-next-line no-new-object
    [new Object(), true],
    // eslint-disable-next-line no-new-object
    [new Object({}), true],
    // eslint-disable-next-line no-new-object
    [new Object([]), true],
    [[], true],
    [undefined, true],
    [null, true],

    [-1, false],
    [0, false],
    [1, false],
    ["exist", false],
    ['"', false],
    [false, false],
    [true, false],
    [Symbol(), false],
    [Symbol("demo_key"), false],
    [{ a: "test" }, false],
    [{ b: 0 }, false],
    [{ c: false }, false],
    [{ d: {} }, false],
    [{ e: [] }, false],
  ])("is '%p' empty? %s", (input, output) => {
    expect(isEmpty(input)).toEqual(output);
    expect(isNotEmpty(input)).toEqual(!output);
  });
});
