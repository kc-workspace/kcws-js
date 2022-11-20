import execution, { Config } from ".";

describe("index", () => {
  it("execution", () => {
    expect(execution).toBeTruthy();
  });

  it("export Config class", () => {
    expect(Config).toBeTruthy();
  });
});
