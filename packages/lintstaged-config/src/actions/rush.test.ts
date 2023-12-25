jest.mock("fs");
jest.mock("child_process");

import { existsSync, readFileSync, statSync } from "node:fs";
import {
  spawnSync,
  type SpawnSyncOptionsWithStringEncoding,
  type SpawnSyncReturns,
} from "node:child_process";
import { rush, rushOn } from "./rush";

type SpawnSyncFn = (
  command: string,
  options: SpawnSyncOptionsWithStringEncoding
) => Partial<SpawnSyncReturns<string>>;

type StatSyncFn = (path: string) => {
  isDirectory(): boolean;
};

describe("Rush actions", () => {
  beforeEach(() => {
    mocked(existsSync).mockClear();
    mocked(readFileSync).mockClear();
    mocked(statSync).mockClear();
    mocked(spawnSync).mockClear();
  });

  describe("RushOn action", () => {
    it.each([
      ["@kcws/root", "test", [], "/bin/rush test --only @kcws/root"],
      [
        "@kcws/root",
        "build",
        ["-t", "-f"],
        "/bin/rush build --only @kcws/root -t -f",
      ],
    ])("using rush command", (pkg, cmd, args, expected) => {
      mocked<SpawnSyncFn>(spawnSync).mockImplementation(() => ({
        status: 0,
        stdout: "/bin/rush",
      }));

      expect(rushOn(pkg, cmd, ...args)).toEqual(expected);
    });

    it.each([
      [
        "@kcws/root",
        "test",
        [],
        "node common/scripts/install-run-rush.js test --only @kcws/root",
      ],
      [
        "@kcws/root",
        "build",
        ["-t", "-f"],
        "node common/scripts/install-run-rush.js build --only @kcws/root -t -f",
      ],
    ])("using rush command", (pkg, cmd, args, expected) => {
      mocked<SpawnSyncFn>(spawnSync).mockImplementation(() => ({
        status: 0,
        stdout: "rush",
      }));

      expect(rushOn(pkg, cmd, ...args)).toEqual(expected);
    });
  });

  describe("Rush action", () => {
    it.each([
      [
        "test",
        [],
        ["/test/hello/world.ts"],
        "/bin/rush test --only @kcws/root",
      ],
      ["test", [], ["/unknown/path/to/code.ts"], "/bin/rush test"],
      ["test", [], ["/unknown.me/path.to/code.ts"], "/bin/rush test"],
    ])("using rush command", (cmd, args, changes, expected) => {
      mocked<SpawnSyncFn>(spawnSync).mockImplementation(() => ({
        status: 0,
        stdout: "/bin/rush",
      }));

      mocked(existsSync).mockImplementation(
        (path) => path === "/test/package.json"
      );
      mocked(readFileSync).mockImplementation(() =>
        Buffer.from(JSON.stringify({ name: "@kcws/root" }))
      );
      mocked<StatSyncFn>(statSync).mockImplementation((path) => ({
        isDirectory() {
          return !path.toString().includes(".");
        },
      }));

      expect(rush(cmd, ...args)(changes)).toEqual(expected);
    });
  });
});
