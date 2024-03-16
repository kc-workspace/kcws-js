import { hello, joinPath } from ".";

describe("hello", () => {
  it("should return hello world", () => {
    expect(hello()).toEqual("hello world");
  });

  it("should return hello custom", () => {
    expect(hello("custom")).toEqual("hello custom");
  });

  it("should join input path together", () => {
    expect(joinPath("a", "b")).toEqual("a/b");
  });
});
