import { spawnSync } from "node:child_process";

/**
 * Find command on the system path, and return the absolute path to the command;
 * Otherwise, return input name and let the system handle if error occurred.
 *
 * @param name - commandline name
 * @returns the absolute path to the command
 *
 * @beta
 */
export const getCommand = (name: string): string => {
  // Remove spaces and symbols from input
  const _name = name.replaceAll(/[ !#$%&*+@^]/g, "");
  const checking = ["command", "-v", _name].join(" ");
  const output = spawnSync(checking, { shell: true, encoding: "utf8" });
  return output.status === 0 ? output.stdout.trim() : name;
};
