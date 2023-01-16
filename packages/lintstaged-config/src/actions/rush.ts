import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { getCommand } from "../utils/cmd";

const resolveRushCommand = (): Array<string> => {
  const rush = getCommand("rush");
  if (rush === "rush") {
    // TODO: Use install-run-rush instead of throw error
    // The problem is how can we resolve to install-run-rush file
    // from package directory.

    throw new Error("Cannot resolve rush scripts, please install rush first.")
  }

  return [rush];
};

const resolvePackageName = (): string => {
  const cwd = process.cwd();
  const pkg = resolve(cwd, "package.json");
  if (existsSync(pkg)) {
    const content = readFileSync(pkg, {
      encoding: "utf8",
    });
    const json = JSON.parse(content);
    if (json.name) return json.name;
  }

  return "";
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
  pkg: string,
  cmd: string,
  ...args: Array<string>
): string => {
  const base = resolveRushCommand();
  if (pkg !== "") base.push("--only", pkg);
  base.push(cmd, ...args);

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
export const rush = (cmd: string, ...args: Array<string>): string => {
  const pkg = resolvePackageName();
  return rushOn(pkg, cmd, ...args);
};
