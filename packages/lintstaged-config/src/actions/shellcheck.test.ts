jest.mock("node:child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((cmd: string) => ({
      status: 0,
      stdout: cmd.split(" ")[2],
    })),
  };
});

import { shellcheck, type IShellcheckOptions } from "./shellcheck";

const option = (options: IShellcheckOptions): IShellcheckOptions => options;

describe("Shellcheck action", () => {
  it("default command", () => {
    expect(shellcheck()).toEqual("shellcheck");
  });

  it.each([
    [option({ files: ["test.js", "world.ts"] }), "shellcheck test.js world.ts"],
  ])("options: %p, return '%s'", (options, output) => {
    expect(shellcheck(options)).toEqual(output);
  });
});
