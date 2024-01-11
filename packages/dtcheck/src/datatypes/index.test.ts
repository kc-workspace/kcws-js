import { getDataType, type TMapFn, type ISettings } from ".";

const mapper: TMapFn<""> = val =>
  /\d+/g.test(val as string) ? "number" : "string";

describe("Datatype", () => {
  it.each([
    ["hello", "string"],
    [123, "number"],
    [undefined, "undefined"],
    [null, "null"],
    [[], "array"],
    [["string"], "array"],
    [[{ a: true }], "array"],
  ])("data type of '%p' should be %p", (input, expected) => {
    expect(getDataType(input)).toEqual(expected);
  });

  const settings = { mapper } satisfies ISettings;

  it.each([
    ["hello", {} satisfies ISettings, "string"],
    ["hello", { mapper: undefined } satisfies ISettings, "string"],
    ["hello", { override: "a" } satisfies ISettings<"a">, "a"],
    ["hello", settings, "string"],
    ["123", settings, "number"],
  ])(
    "data type of '%p' with %p setting should be %p",
    (input, setting, expected) => {
      expect(getDataType(input, setting)).toEqual(expected);
    }
  );
});
