import { getCommand } from "../utils/cmd";

/**
 * build command using internal command finder.
 *
 * @param cmd - command name
 * @param args - command arguments
 * @returns command string
 *
 * @beta
 */
export const generic = (cmd: string, ...args: Array<string>): string => {
  return [getCommand(cmd)].concat(...args).join(" ");
};
