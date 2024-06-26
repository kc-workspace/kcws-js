import type { IExampleContextPlugin } from "./index.type";

export class ExampleContextPlugin implements IExampleContextPlugin {
  readonly name = "example" as const;
  readonly dependencies = [] as const;

  init() {
    // we didn't initiate anything from context
  }
}
