jest.mock("node:child_process", () => {
  return {
    spawnSync: jest.fn().mockImplementation((cmd: string) => ({
      status: cmd.includes("error") ? 1 : 0,
      stdout: cmd,
    })),
  };
});

import { spawnSync } from "node:child_process";

import { getCommand } from "./cmd";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("cmd utilities", () => {
  it("completed getCommand", () => {
    expect(getCommand("test")).toEqual("command -v test");
    expect(spawnSync).toHaveBeenCalledTimes(1);
  });

  it("cannot getCommand", () => {
    expect(getCommand("error")).toEqual("error");
    expect(spawnSync).toHaveBeenCalledTimes(1);
  });
});
