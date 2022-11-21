import type { IBaseActionOptions, BaseActionFn } from "./_base";
import { getCommand } from "../utils/cmd";

/**
 * Option for create yamllint command
 *
 * @beta
 */
export interface IYamllintOptions extends IBaseActionOptions {
  config?: string;
  strict?: boolean;
}

/**
 * Default yamllint config path from root repository
 *
 * @beta
 */
export const DEFAULT_YAMLLINT_CONFIG: string = ".github/linters/.yamllint.yml";

/**
 * create command with input option
 *
 * @remarks
 *
 * Function type: {@link BaseActionFn} and
 * Option type: {@link IYamllintOptions}
 *
 * @param option - customize option
 * @returns command
 *
 * @beta
 */
export const yamllint: BaseActionFn<IYamllintOptions> = (option) => {
  const args: Array<string> = [getCommand("yamllint")];

  const configFile = option?.config ?? DEFAULT_YAMLLINT_CONFIG;
  args.push("--config-file", configFile);

  if (option?.strict ?? true) args.push("--strict");

  const files = option?.files ?? [];
  if (files.length > 0) args.push(...files);
  else args.push("."); // Run all files in current directory

  return args.join(" ");
};
