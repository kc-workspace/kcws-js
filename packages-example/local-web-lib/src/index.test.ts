import { hello } from ".";

describe("hello", () => {
  it("should return hello world", () => {
    expect(hello("world")).toEqual("hello world");
  });
});
