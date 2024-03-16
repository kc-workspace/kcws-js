jest.mock("node:child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((cmd: string) => ({
      status: 0,
      stdout: cmd.split(" ")[2],
    })),
  };
});

import {
  yamllint,
  DEFAULT_YAMLLINT_CONFIG as DEF_CONF,
  type IYamllintOptions,
} from "./yamllint";

const option = (options: IYamllintOptions): IYamllintOptions => options;

describe("Yamllint action", () => {
  it("default command", () => {
    expect(yamllint()).toEqual(`yamllint --config-file ${DEF_CONF} --strict .`);
  });

  it.each([
    [option({ strict: false }), `yamllint --config-file ${DEF_CONF} .`],
    [
      option({ files: ["test.js", "world.ts"] }),
      `yamllint --config-file ${DEF_CONF} --strict test.js world.ts`,
    ],
    [
      option({ config: "example/.yamllint" }),
      `yamllint --config-file example/.yamllint --strict .`,
    ],
  ])("options: %p, return '%s'", (options, output) => {
    expect(yamllint(options)).toEqual(output);
  });
});
