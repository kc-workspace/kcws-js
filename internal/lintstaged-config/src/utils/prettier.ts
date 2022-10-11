import { Action } from "../models/Action";

export interface IPrettierOptions {
  fix?: boolean;
}

export const prettier = (opts?: IPrettierOptions): Action => {
  return (filenames: string[]) => {
    const args: string[] = ["prettier"];

    if (opts?.fix ?? true) args.push("--write");

    args.push(...filenames);
    return args.join(" ");
  };
};
