import { regex } from "./regex";

describe("regex()", () => {
  it("should return correct path on single extension", () => {
    expect(regex("json")).toEqual("**/*.json");
  });

  it("should return correct path on multiple extension", () => {
    expect(regex("js", "jsx")).toEqual("**/*.{js,jsx}");
  });
});
