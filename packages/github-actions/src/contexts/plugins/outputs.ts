import { setOutput, setSecret } from "@actions/core";

import { BaseContext, ContextPlugin } from "../builder.type";

/**
 * Context Plugin allows user to create output interact with another actions
 * @public
 */
export class OutputContextPlugin
  implements ContextPlugin<BaseContext, "output">
{
  readonly name = "output";
  readonly dependencies = [];

  init() {}

  setSecret(value: string) {
    setSecret(value);
  }

  /**
   * save output value by name and can be read by user
   *
   * @param name - output name
   * @param value - output value
   */
  setOutput<V>(name: string, value: V) {
    setOutput(name, value);
  }
}
