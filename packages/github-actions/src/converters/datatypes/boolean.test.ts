import { convert, convertToBool, toBool } from "..";

type Testcases = [unknown, boolean | Error][];

describe("converters.dtypes.boolean", () => {
  const cases: Testcases = [
    [
      "hello",
      new Error(
        "Cannot convert hello (string) to boolean because 'hello is not a boolean'"
      ),
    ],
    ["true", true],
    ["false", false],
    ["t", true],
    ["1", true],
    ["0", false],
    ["on", true],
    [1, true],
    [0, false],
    [true, true],
    [false, false],
  ];

  test.each(cases)("convert(%p) should get %p", (a, expected) => {
    if (typeof expected === "boolean") {
      const result = convert(a, toBool);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convert(a, toBool)).toThrow(expected);
    }
  });

  test.each(cases)("convertToBool(%p) should get %p", (a, expected) => {
    if (typeof expected === "boolean") {
      const result = convertToBool(a);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convertToBool(a)).toThrow(expected);
    }
  });
});
