import { convert, convertToString, toString } from "..";

type Testcases = [unknown, string | Error][];

describe("converters.datatypes.string", () => {
  const cases: Testcases = [
    ["hello", "hello"],
    [123, "123"],
    [1.23, "1.23"],
    [false, "false"],
    [true, "true"],
    [undefined, "<undefined>"],
    // eslint-disable-next-line unicorn/no-null
    [null, "<null>"],
    [[1, 2, 3], "[1,2,3]"],
    [{ name: "hello" }, '{"name":"hello"}'],
    [Symbol.for("hello"), "Symbol(hello)"],
    [console.log, "<Function log>"],
    [BigInt(123), "123"],
  ];

  test.each(cases)("convert(%p) should get %p", (a, expected) => {
    if (typeof expected === "string") {
      const result = convert(a, toString);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convert(a, toString)).toThrow(expected);
    }
  });

  test.each(cases)("convertToString(%p) should get %p", (a, expected) => {
    if (typeof expected === "string") {
      const result = convertToString(a);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result).toEqual(expected);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => convertToString(a)).toThrow(expected);
    }
  });
});
