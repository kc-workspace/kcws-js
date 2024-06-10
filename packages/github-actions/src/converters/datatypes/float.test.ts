import { convert, convertToFloat, toFloat } from "..";

type Testcases = [unknown, number | Error][];

describe("converters.dtypes.float", () => {
  const cases: Testcases = [
    [
      "hello",
      new Error(
        "Cannot convert hello (string) to float because 'hello is not a float number'"
      ),
    ],
    [123, 123],
    [1.23, 1.23],
    ["123", 123],
    ["1.23", 1.23],
    ["1.2.3", 1.2],
    ["1AB", 1],
    [
      false,
      new Error(
        "Cannot convert false (boolean) to float because 'false is not a float number'"
      ),
    ],
  ];

  test.each(cases)("convert(%p) should get %p", (a, expected) => {
    if (typeof expected === "number") {
      const result = convert(a, toFloat);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convert(a, toFloat)).toThrow(expected);
    }
  });

  test.each(cases)("convertToFloat(%p) should get get %p", (a, expected) => {
    if (typeof expected === "number") {
      const result = convertToFloat(a);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convertToFloat(a)).toThrow(expected);
    }
  });
});
