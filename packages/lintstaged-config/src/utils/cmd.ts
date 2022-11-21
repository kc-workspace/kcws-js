import { spawnSync } from "child_process";

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
  // Remove all space from input
  const _name = name.replace(/ /g, "");
  const checking = ["command", "-v", _name].join(" ");
  const output = spawnSync(checking, { shell: true, encoding: "utf8" });
  if (output.status === 0) return output.stdout;
  else return name;
};
