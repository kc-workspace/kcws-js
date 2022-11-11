import exection, { Config } from ".";

describe("index", () => {
  it("execution", () => {
    expect(exection).toBeTruthy();
  });

  it("export Config class", () => {
    expect(Config).toBeTruthy();
  });
});
