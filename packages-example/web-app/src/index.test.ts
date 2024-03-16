import { hello, windowString } from ".";

describe("hello", () => {
  it("should return hello world", () => {
    expect(hello()).toEqual("hello world");
  });

  it("should return hello custom", () => {
    expect(hello("custom")).toEqual("hello custom");
  });

  it("should return window string", () => {
    expect(windowString()).toEqual("[object Window]");
  });
});
