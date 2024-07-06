import type { IBaseActionOptions, BaseActionFn } from "./_base";

import { existsSync } from "node:fs";
import { join } from "node:path";

import { getCommand } from "../utils/cmd";

/**
 * Option for create yamllint command
 *
 * @beta
 */
export interface IYamllintOptions extends IBaseActionOptions {
  /** yamllint config file; recommend to use absolute path */
  config?: string;
  /**
   * enabled yamllint strict mode;
   * Strict means return non-zero code when warning occur
   */
  strict?: boolean;
}

/**
 * Default yamllint config path from root repository
 *
 * @beta
 */
export const DEFAULT_YAMLLINT_CONFIGS = [
  ".github/linters/.yamllint.yml",
  ".github/linters/.yamllint.yaml",
];

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
export const yamllint: BaseActionFn<IYamllintOptions> = option => {
  const args: Array<string> = [getCommand("yamllint")];

  // If config option existed, always use option regardless of file existence
  if (option?.config) {
    args.push("--config-file", option?.config);
    // Else check if default config is existed, then use the default config
  } else {
    for (const config of DEFAULT_YAMLLINT_CONFIGS) {
      if (existsSync(join(process.cwd(), config))) {
        args.push("--config-file", join(process.cwd(), config));
        break;
      }
    }
  }

  if (option?.strict ?? true) args.push("--strict");
  const files = option?.files ?? [];
  if (files.length > 0) args.push(...files);
  else args.push("."); // Run all files in current directory

  return args.join(" ");
};
