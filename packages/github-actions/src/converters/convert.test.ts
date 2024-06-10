import { convert, toBool, toString } from ".";

describe("converters.convert", () => {
  test.each([["hello", toString, "hello"]])(
    "convert(%p, %p) returns %p",
    (a, b, expected) => {
      const result = convert(a, b);
      expect(result).toEqual(expected);
    }
  );

  test("convert(hello, toBool) throw exception", () => {
    expect(() => convert("hello", toBool)).toThrow("hello is not a boolean");
  });
});
