import type { IBaseActionOptions, BaseActionFn } from "./_base";
import { getCommand } from "../utils/cmd";

/**
 * Option for create shellcheck command
 *
 * @beta
 */
export interface IShellcheckOptions extends IBaseActionOptions {}

/**
 * create command with input option
 *
 * @param option - customize option
 * @returns command
 *
 * @beta
 */
export const shellcheck: BaseActionFn<IShellcheckOptions> = (option) => {
  const args: Array<string> = [getCommand("shellcheck")];

  const files = option?.files ?? [];
  if (files.length > 0) args.push(...files);

  return args.join(" ");
};
