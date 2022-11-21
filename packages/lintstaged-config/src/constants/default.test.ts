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

  it("builder.default() should be the same with defineDefaultConfig()", () => {
    const config1 = Config.builder().default().build();
    const config2 = defineDefaultConfig(Config.builder()).build();
    expect(config1.compare(config2)).toBeTruthy();
  });
});
