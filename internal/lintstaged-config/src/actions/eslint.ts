import type { IBaseActionOptions, BaseActionFn } from "./_base";

import { getCommand } from "../utils/cmd";

/**
 * Option for create eslint command
 *
 * @beta
 */
export interface IEslintOptions extends IBaseActionOptions {
  fix?: boolean;
  maxWarnings?: number;
}

/**
 * create command with input option
 *
 * @param option - customize option
 * @returns command
 *
 * @beta
 */
export const eslint: BaseActionFn<IEslintOptions> = (option) => {
  const args: Array<string> = [getCommand("eslint")];

  if (option?.fix ?? true) args.push("--fix");

  const maxWarnings = option?.maxWarnings ?? 0;
  if (maxWarnings >= 0) args.push("--max-warnings", maxWarnings.toString());

  const files = option?.files ?? [];
  if (files.length > 0) args.push(...files);

  return args.join(" ");
};
