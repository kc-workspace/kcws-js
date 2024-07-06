jest.mock("node:child_process");
jest.mock("node:fs");

import { spawnSync, type SpawnSyncReturns } from "node:child_process";
// import { existsSync } from "node:fs";

import { Config } from "../models/Config";
import { defineDefaultConfig, type CustomDefaultConfig } from "./default";

const custom = (input?: CustomDefaultConfig) => input;

describe("default constants", () => {
  beforeEach(() => {
    jest.mocked(spawnSync).mockImplementation(cmd => {
      return {
        status: 0,
        stdout: cmd.split(" ")[2],
      } as SpawnSyncReturns<string>;
    });

    jest.spyOn(process, "cwd").mockReturnValue("/tmp");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("define default config", () => {
    const builder = Config.builder();
    expect(defineDefaultConfig(builder).build().length).toBeGreaterThan(0);
  });

  it.each([
    [
      "jsts",
      undefined,
      [
        "eslint --fix --max-warnings 0 /tmp/file.txt",
        "prettier --write /tmp/file.txt",
      ],
    ],
    ["sh", undefined, ["shellcheck /tmp/file.txt"]],
    ["json", undefined, ["prettier --write /tmp/file.txt"]],
    ["yaml", undefined, ["yamllint --strict /tmp/file.txt"]],
    [
      "jsts",
      custom({ jstsPrettier: false }),
      ["eslint --fix --max-warnings 0 /tmp/file.txt"],
    ],
    ["jsts", custom({ eslint: false }), ["prettier --write /tmp/file.txt"]],
    ["sh", custom({ shellcheck: false }), []],
    ["json", custom({ jsonPrettier: false }), []],
    ["yaml", custom({ yamllint: false }), []],
    [
      "yaml",
      custom({ yamllint: { strict: false } }),
      ["yamllint /tmp/file.txt"],
    ],
    [
      "yaml",
      custom({ yamllint: { config: "example/config.yaml" } }),
      ["yamllint --config-file example/config.yaml --strict /tmp/file.txt"],
    ],
  ])(
    "check action '%s' with custom=%p should run '%p'",
    (key, custom, expected) => {
      const builder = Config.builder();
      return expect(
        defineDefaultConfig(builder, custom)
          .build()
          .build()
          .getCommands(k => {
            return key === k ? ["/tmp/file.txt"] : [];
          })
      ).resolves.toEqual(expected);
    }
  );

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
