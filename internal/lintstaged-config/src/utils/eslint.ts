import { Action } from "../models/Action";

export interface IEslintOptions {
  fix?: boolean;
  maxWarnings?: number;
}

export const eslint = (opts?: IEslintOptions): Action => {
  return (filenames: string[]) => {
    const args: string[] = ["eslint"]; // --fix --max-warnings 0

    if (opts?.fix ?? true) args.push("--fix");

    const maxWarnings = opts?.maxWarnings ?? 0;
    if (maxWarnings >= 0) args.push("--max-warnings", maxWarnings.toString());

    args.push(...filenames);
    return args.join(" ");
  };
};
