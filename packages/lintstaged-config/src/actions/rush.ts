import { existsSync, readFileSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { ConfigFn } from "../models/IConfig";
import { getCommand } from "../utils/cmd";
import { WithUndefined } from "../types/generic";

const ROOT: string = "/";

/**
 * @internal
 */
export type WalkCallback = (dir: string) => WithUndefined<string>;

const walkDir = (file: string, cb: WalkCallback): WithUndefined<string> => {
  const next = dirname(file);
  if (next === ROOT) return undefined;

  const nextStat = statSync(next);
  if (nextStat.isDirectory()) {
    const result = cb(next);
    if (!result) return walkDir(next, cb);
    else return result;
  }

  return undefined;
};

const resolveRushCommand = (): Array<string> => {
  const rush = getCommand("rush");
  if (rush === "rush") {
    return ["node", "common/scripts/install-run-rush.js"];
  }

  return [rush];
};

const resolvePackageName = (files: Array<string>): WithUndefined<string> => {
  for (const file of files) {
    const name = walkDir(file, (dir) => {
      const pkg = resolve(dir, "package.json");
      if (existsSync(pkg)) {
        const content = readFileSync(pkg);
        const json = JSON.parse(content.toString("utf8"));
        return json.name;
      }
    });

    if (name) return name;
  }
};

/**
 * build rush command using internal command finder.
 *
 * @param pkg - package name that will run on
 * @param cmd - rush command to execute
 * @param args - additional command arguments
 * @returns command string
 *
 * @beta
 */
export const rushOn = (
  pkg: WithUndefined<string>,
  cmd: string,
  ...args: Array<string>
): string => {
  const base = resolveRushCommand().concat(cmd);
  if (pkg) base.push("--only", pkg);
  base.push(...args);

  return base.join(" ");
};

/**
 * build rush command using internal command finder.
 * this will automatically resolve package to run
 * using cwd and package.json file.
 *
 * @param cmd - rush command to execute
 * @param args - additional command arguments
 * @returns command string
 *
 * @beta
 */
export const rush = (cmd: string, ...args: Array<string>): ConfigFn => {
  return (files: Array<string>) => {
    const pkg = resolvePackageName(files);
    return rushOn(pkg, cmd, ...args);
  };
};
