import { Config } from "../models/Config";
import { defineDefaultConfig } from "./default";

describe("default constants", () => {
  it("define default config", () => {
    const builder = Config.builder();
    expect(defineDefaultConfig(builder).build().length).toBeGreaterThan(0);
  });

  it("append default config", () => {
    const builder = Config.builder().set("test", {});
    expect(defineDefaultConfig(builder).build().length).toBeGreaterThan(1);
  });
});
