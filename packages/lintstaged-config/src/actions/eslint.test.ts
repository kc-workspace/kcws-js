jest.mock("child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((cmd: string) => ({
      status: 0,
      stdout: cmd.split(" ")[2],
    })),
  };
});

import { eslint, type IEslintOptions } from "./eslint";

const option = (options: IEslintOptions): IEslintOptions => options;

describe("Eslint action", () => {
  it("default command", () => {
    expect(eslint()).toEqual("eslint --fix --max-warnings 0");
  });

  it.each([
    [option({ fix: false }), "eslint --max-warnings 0"],
    [option({ maxWarnings: -1 }), "eslint --fix"],
    [option({ maxWarnings: 10 }), "eslint --fix --max-warnings 10"],
    [
      option({ files: ["test.js", "world.ts"] }),
      "eslint --fix --max-warnings 0 test.js world.ts",
    ],
  ])("options: %p, return '%s'", (options, output) => {
    expect(eslint(options)).toEqual(output);
  });
});
