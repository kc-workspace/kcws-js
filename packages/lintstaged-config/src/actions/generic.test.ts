jest.mock("child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((cmd: string) => ({
      status: 0,
      stdout: cmd.split(" ")[2],
    })),
  };
});

import { generic } from "./generic";

describe("Generic action", () => {
  it.each([
    ["echo", [], "echo"],
    ["echo", ["test"], "echo test"],
    ["mkdir", ["-d", "-p", "test"], "mkdir -d -p test"],
  ])("default command", (cmd, args, output) => {
    expect(generic(cmd, ...args)).toEqual(output);
  });
});
