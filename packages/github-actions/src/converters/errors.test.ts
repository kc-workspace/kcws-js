import { ConvertError } from "./errors";

describe("converters.errors", () => {
  test("error with reason", () => {
    expect(() => {
      throw new ConvertError(
        "hello world",
        "int",
        new Error("input is not number")
      );
    }).toThrow(
      "Cannot convert hello world (string) to int because 'input is not number'"
    );
  });

  test("error without reason", () => {
    expect(() => {
      throw new ConvertError("hello world", "int");
    }).toThrow(
      "Cannot convert hello world (string) to int because 'unknown error occurred'"
    );
  });
});
