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
  init() {}

  /**
   * {@inheritDoc _addPath}
   */
  addPath(additionalPath: string) {
    _addPath(additionalPath);
  }

  addPaths(...additionalPaths: string[]) {
    for (const path of additionalPaths) {
      this.addPath(path);
    }
  }

  /**
   * {@inheritDoc exportVariable}
   */
  setEnvVar<V>(name: string, value: V) {
    exportVariable(name, value);
  }

  /**
   * {@inheritDoc _which}
   */
  which(tool: string, check?: boolean) {
    return _which(tool, check);
  }
}
