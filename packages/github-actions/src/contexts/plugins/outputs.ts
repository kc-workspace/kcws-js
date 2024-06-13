import { setOutput } from "@actions/core";

import { BaseContext, ContextPlugin } from "../builder.type";

export class OutputContextPlugin
  implements ContextPlugin<BaseContext, "output">
{
  readonly name = "output";
  readonly dependencies = [];

  init() {}

  setOutput<V>(name: string, value: V) {
    setOutput(name, value);
  }
}
