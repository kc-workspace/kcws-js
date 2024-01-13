import { ConfigBuilder, ConfigService } from ".";

describe("config service", () => {
  it("create empty builder", () => {
    expect(ConfigService.builder()).toEqual(new ConfigBuilder({}, {}));
  });
});
