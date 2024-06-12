import { exec, type ExecOptions } from "@actions/exec";

import {
  ContextPlugin,
  DefaultContext,
  InputContextPlugin,
  LogContextPlugin,
} from "..";
import { toBool } from "../../converters";

type IExecContext = DefaultContext<
  {
    [key in LogContextPlugin["name"]]: LogContextPlugin;
  } & {
    [key in InputContextPlugin["name"]]: InputContextPlugin;
  }
>;

export type IExecContextPlugin = ContextPlugin<
  IExecContext,
  "exec",
  (keyof IExecContext["plugins"])[]
>;

/**
 * Context Plugin allows user to execute commandline
 * @public
 */
export class ExecContextPlugin implements IExecContextPlugin {
  readonly name = "exec";
  readonly dependencies: IExecContextPlugin["dependencies"] = ["log", "input"];

  private options: ExecOptions | undefined;
  private context: IExecContext | undefined;
  private dryrun: boolean;

  constructor() {
    this.options = undefined;
    this.dryrun = false;
  }

  init(context: IExecContext) {
    this.context = context;
    this.dryrun = context.use("input").optional("dryrun", toBool) ?? false;
  }

  /**
   * call this function before {@link ExecContextPlugin.run} to inject execute options
   */
  withOptions(options: ExecOptions) {
    this.options = options;
    return this;
  }

  /**
   * run input commandline with optional options (from {@link ExecContextPlugin.withOptions}).
   * This will reset options after completed. To preserve the options later,
   * use {@link ExecContextPlugin.rerun} instead
   *
   * @param cmd - commandline
   * @param args - command arguments
   * @returns exit code
   */
  async run(cmd: string, ...arguments_: string[]) {
    const options = this.options;
    this.options = undefined;

    return await this.execute(cmd, arguments_, options);
  }

  /**
   * run input commandline with optional options (from {@link ExecContextPlugin.withOptions}).
   * This will preserve options after completed. To reset the options,
   * use {@link ExecContextPlugin.run} instead
   *
   * @param cmd - commandline
   * @param args - command arguments
   * @returns exit code
   */
  async rerun(cmd: string, ...arguments_: string[]) {
    return await this.execute(cmd, arguments_, this.options);
  }

  private async execute(
    cmd: string,
    arguments_: string[],
    options?: ExecOptions
  ) {
    if (this.dryrun) {
      const message = `[DRY] $ ${cmd} '${arguments_.join(" ")}'`;
      this.context?.use("log").info(message);

      return 0;
    }

    return await exec(cmd, arguments_, options);
  }
}
