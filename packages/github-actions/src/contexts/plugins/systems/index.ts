import type { ISystemContextPlugin } from "./index.type";

import { addPath as _addPath, exportVariable } from "@actions/core";
import { which as _which } from "@actions/io";

/**
 * Context Plugin allows user to manages their system information
 * @public
 */
export class SystemContextPlugin implements ISystemContextPlugin {
  readonly name = "system" as const;
  readonly dependencies = [] as const;

  init() {
    // we didn't initiate anything from context
  }

  /**
   * Prepends input string to the PATH variable (for this action and future actions)
   *
   * @param additionalPath - new path string
   *
   * @see https://github.com/actions/toolkit/blob/main/packages/core
   */
  addPath(additionalPath: string) {
    _addPath(additionalPath);
  }

  /**
   * Prepends multiple input string to the PATH variable
   *
   * @param additionalPaths - multiple path string
   *
   * @see {@link SystemContextPlugin.addPath}
   */
  addPaths(...additionalPaths: string[]) {
    for (const path of additionalPaths) {
      this.addPath(path);
    }
  }

  /**
   * Sets env variable for this action and future actions in the job
   *
   * @param name - the variable name to set
   * @param value - the value of the variable
   *
   * @see https://github.com/actions/toolkit/blob/main/packages/core
   */
  setEnvVar<V>(name: string, value: V) {
    exportVariable(name, value);
  }

  /**
   * Returns path of a tool had the tool actually been invoked.
   * If you check and the tool does not exist, it will throw error.
   *
   * @param tool - name of the tool
   * @param check - whether to check if tool exists
   * @returns path to tool
   */
  which(tool: string, check?: boolean) {
    return _which(tool, check);
  }
}
