import { PluginName } from ".";

describe("plugin", () => {
  it("should return correct name", () => {
    expect(PluginName).toEqual("esbuild-plugin");
  });
});
