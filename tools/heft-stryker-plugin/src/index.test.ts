import plugin from ".";

describe("hello", () => {
  it("should return hello world", () => {
    expect(plugin.pluginName).toBeTruthy();
  });
});
