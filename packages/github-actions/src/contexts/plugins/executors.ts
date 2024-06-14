import type { CapturedResult } from "./executors.type";

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

/**
 * simplify version of {@link ExecContextPlugin} interface
 * @public
 */
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
  private dryrun: boolean;
  private logger: LogContextPlugin | undefined;

  constructor() {
    this.options = undefined;
    this.dryrun = false;
  }

  init(context: IExecContext) {
    this.logger = context.use("log");
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
  async run(cmd: string, ...args: string[]) {
    const output = await this.rerun(cmd, ...args);
    this.options = undefined;
    return output;
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
  async rerun(cmd: string, ...args: string[]) {
    return await this.execute(cmd, args, this.options);
  }

  /**
   * run input commandline with optional options and capture stdout and stderr.
   * This will reset options after completed. To preserve the options later,
   * use {@link ExecContextPlugin.captureRerun} instead
   *
   * @param cmd - command line
   * @param args - command arguments
   * @returns captured result from commandline
   */
  async captureRun(cmd: string, ...args: string[]): Promise<CapturedResult> {
    const output = await this.captureRerun(cmd, ...args);
    this.options = undefined;
    return output;
  }

  /**
   * run input commandline with optional options and capture stdout and stderr.
   * This will preserve options after completed. To reset the options,
   * use {@link ExecContextPlugin.captureRun} instead
   *
   * @param cmd - command line
   * @param args - command arguments
   * @returns captured result from commandline
   */
  async captureRerun(cmd: string, ...args: string[]): Promise<CapturedResult> {
    let stdout: Buffer | undefined;
    let stderr: Buffer | undefined;
    const code = await this.execute(cmd, args, {
      ...this.options,
      listeners: {
        ...this.options?.listeners,
        stderr: data => {
          stderr = data;
        },
        stdout: data => {
          stdout = data;
        },
        debug: data => {
          this.logger?.debug(data);
        },
      },
    });
    return {
      code,
      stderr,
      stdout,
    };
  }

  private async execute(
    cmd: string,
    arguments_: string[],
    options?: ExecOptions
  ) {
    if (this.dryrun) {
      const message = `[DRY] $ ${cmd} '${arguments_.join(" ")}'`;
      this.logger?.info(message);

      return 0;
    }

    return await exec(cmd, arguments_, options);
  }
}
