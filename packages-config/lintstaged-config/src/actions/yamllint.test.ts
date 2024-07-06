jest.mock("node:child_process");
jest.mock("node:fs");

import { spawnSync, type SpawnSyncReturns } from "node:child_process";
import { existsSync } from "node:fs";

import {
  yamllint,
  DEFAULT_YAMLLINT_CONFIGS,
  type IYamllintOptions,
} from "./yamllint";

const option = (options: IYamllintOptions): IYamllintOptions => options;

const rootPath = "/tmp";
describe("Yamllint action", () => {
  beforeEach(() => {
    jest.mocked(spawnSync).mockImplementation(cmd => {
      return {
        status: 0,
        stdout: cmd.split(" ")[2],
      } as SpawnSyncReturns<string>;
    });
    jest.spyOn(process, "cwd").mockReturnValue(rootPath);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("default command without config", () => {
    jest.mocked(existsSync).mockReturnValue(false);
    expect(yamllint()).toEqual(`yamllint --strict .`);
  });

  it("default command with first matched file config", () => {
    const rootPath = "/tmp";
    jest.mocked(existsSync).mockReturnValueOnce(true);

    expect(yamllint()).toEqual(
      `yamllint --config-file ${rootPath}/${DEFAULT_YAMLLINT_CONFIGS[0]} --strict .`
    );
  });

  it("default command with second matched file config", () => {
    jest.mocked(existsSync).mockReturnValueOnce(false);
    jest.mocked(existsSync).mockReturnValueOnce(true);

    expect(yamllint()).toEqual(
      `yamllint --config-file ${rootPath}/${DEFAULT_YAMLLINT_CONFIGS[1]} --strict .`
    );
  });

  it.each([
    [option({ strict: false }), `yamllint .`],
    [
      option({ files: ["test.js", "world.ts"] }),
      `yamllint --strict test.js world.ts`,
    ],
    [
      option({ config: "example/.yamllint" }),
      `yamllint --config-file example/.yamllint --strict .`,
    ],
  ])("options: %p, return '%s'", (options, output) => {
    expect(yamllint(options)).toEqual(output);
  });
});
