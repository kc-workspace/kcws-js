import { equals } from ".";

describe("Equals function", () => {
  it.each([
    [1, 1, true],
    [true, true, true],
  ])("Is the '%p' and '%p' equals? %t", (a, b, expected) => {
    expect(equals(a, b)).toEqual(expected);
  });
});
