import type { BaseContext, ContextPlugin } from "..";

import { info } from "@actions/core";
import { exec, type ExecOptions } from "@actions/exec";

import { toBool } from "../../converters";
import { findInputs } from "../../utils/inputs";

/**
 * Context Plugin allows user to execute commandline
 * @public
 */
export class ExecContextPlugin implements ContextPlugin<"exec"> {
  readonly name = "exec";

  private options: ExecOptions | undefined;
  private dryrun: boolean;

  constructor() {
    this.options = undefined;
    this.dryrun = false;
  }

  init(context: BaseContext) {
    this.dryrun = findInputs(context.name, "dryrun", toBool) ?? false;
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
      info(message);
      return 0;
    }

    return await exec(cmd, arguments_, options);
  }
}
