import type { ISettings } from "./index.type";

import { equals } from ".";

describe("Equals function", () => {
  it.each([
    [1, 1, true],
    [true, true, true],
    [1, true, false],
    ["123", 123, false],
  ])("Are '%p' and '%p' equals? %s", (a, b, expected) => {
    expect(equals(a, b)).toEqual(expected);
  });

  it.each([
    [1, 1, { dataTypes: { override: "boolean" } } satisfies ISettings, true],
    [true, true, {} satisfies ISettings, true],
    [
      "123",
      123,
      {
        dataTypes: { override: "string" },
        equalFnMapper: { string: (a, b) => `${a}` === `${b}` },
      } satisfies ISettings,
      true,
    ],
  ])("Are '%p' and '%p' equals (%p)? %s", (a, b, setting, expected) => {
    expect(equals(a, b, setting)).toEqual(expected);
  });
});
