import { execSync } from "child_process";

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
  const checking = ["command", "-v", name].join(" ");
  try {
    return execSync(checking, { encoding: "utf-8" });
  } catch (e: unknown) {
    // If we cannot resolve command name,
    // just return them that let terminal handle an error
    return name;
  }
};
