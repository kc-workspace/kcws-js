import type { IOutputContextPlugin } from "./index.type";

import {
  setSecret as _setSecret,
  setOutput as _setOutput,
} from "@actions/core";

/**
 * Context Plugin allows user to manages data output from Actions
 * @public
 */
export class OutputContextPlugin implements IOutputContextPlugin {
  readonly name = "output" as const;
  readonly dependencies = [] as const;
  init() {}

  /**
   * mark input as secret, so it didn't show on outputs
   * @param value - input string
   */
  markAsSecret(value: string) {
    _setSecret(value);
  }

  /**
   * save output value by name and can be read by user
   *
   * @param name - output name
   * @param value - output value
   */
  setOutput<V>(name: string, value: V) {
    _setOutput(name, value);
  }
}
