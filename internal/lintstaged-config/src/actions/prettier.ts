import type { IBaseActionOptions, BaseActionFn } from "./_base";

/**
 * Option for create prettier command
 *
 * @beta
 */
export interface IPrettierOptions extends IBaseActionOptions {
  fix?: boolean;
}

/**
 * create command with input option
 *
 * @param option - customize option
 * @returns command
 *
 * @beta
 */
export const prettier: BaseActionFn<IPrettierOptions> = (option) => {
  const args: Array<string> = ["prettier"];
  if (option?.fix ?? true) args.push("--write");

  const files = option?.files ?? [];
  if (files.length > 0) args.push(...files);

  return args.join(" ");
};
