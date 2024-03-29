jest.mock("node:child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((command: string) => ({
      status: 0,
      stdout: command.split(" ")[2],
    })),
  };
});

import { prettier, type IPrettierOptions } from "./prettier";

const option = (options: IPrettierOptions): IPrettierOptions => options;

describe("Prettier action", () => {
  it("default command", () => {
    expect(prettier()).toEqual("prettier --write");
  });

  it.each([
    [option({ fix: false }), "prettier"],
    [
      option({ files: ["test.js", "world.ts"] }),
      "prettier --write test.js world.ts",
    ],
  ])("options: %p, return '%s'", (options, output) => {
    expect(prettier(options)).toEqual(output);
  });
});
