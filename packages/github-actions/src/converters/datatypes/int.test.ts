import { convert, convertToInt, toInt } from "..";

type Testcases = [unknown, number | Error][];

describe("converters.dtypes.int", () => {
  const cases: Testcases = [
    [
      "hello",
      new Error(
        "Cannot convert hello (string) to int because 'hello is not an integer'"
      ),
    ],
    [123, 123],
  ];

  test.each(cases)("convert(%p) should get %p", (a, expected) => {
    if (typeof expected === "number") {
      const result = convert(a, toInt);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convert(a, toInt)).toThrow(expected);
    }
  });

  test.each(cases)("convertToInt(%p) should get %p", (a, expected) => {
    if (typeof expected === "number") {
      const result = convertToInt(a);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convertToInt(a)).toThrow(expected);
    }
  });
});
