import { regex } from ".";

describe("hello", () => {
  it("should return correct path on single extension", () => {
    expect(regex("json")).toHaveProperty("**/*.json");
  });

  it("should return correct path on multiple extension", () => {
    expect(regex("js", "jsx")).toHaveProperty("**/*.{js,jsx}");
  });
});
