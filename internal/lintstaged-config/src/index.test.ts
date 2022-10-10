import config from ".";

describe("hello", () => {
  it("should return hello world", () => {
    expect(config).toHaveProperty("*");
  });
});
