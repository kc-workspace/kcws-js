import { addPath as _addPath, exportVariable } from "@actions/core";

import { BaseContext, ContextPlugin } from "../builder.type";

/**
 * Context Plugin allows user to manage system information
 * @public
 */
export class SystemContextPlugin
  implements ContextPlugin<BaseContext, "system">
{
  readonly name = "system";
  readonly dependencies = [];

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
}
