import defineConfig, { Config } from ".";

describe("index", () => {
  it("defineConfig exported", () => {
    expect(defineConfig).toBeTruthy();
  });

  it("Config exported", () => {
    expect(Config).toBeTruthy();
  });

  it("default config", () => {
    expect(Config.default().build().length).toBeGreaterThan(0);
  });
});
