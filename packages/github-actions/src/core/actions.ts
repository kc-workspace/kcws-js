import type { BaseContext } from "../contexts";
import type { InputBuilder, Runner } from "./actions.type";

import { setFailed } from "@actions/core";

import { deepMerge } from "../utils/objects";

/**
 * Main Github Actions for executes runners with context.
 * This is the main entrypoint when creating GitHub Actions.
 *
 * @public
 */
class Actions<Input extends object, Context extends BaseContext> {
  /**
   * create action object based on input and context
   *
   * @param context - actions context
   * @param builder - actions input builder
   * @returns action object for executes runner
   */
  static builder<Input extends object, Context extends BaseContext>(
    context: Context,
    builder: InputBuilder<Input, Context>
  ) {
    return new Actions(context, builder);
  }

  private readonly context: Context;
  private readonly builder: InputBuilder<Input, Context>;

  private constructor(context: Context, builder: InputBuilder<Input, Context>) {
    this.context = context;
    this.builder = builder;
  }

  /**
   * executes input runner using action context and default input.
   *
   * @param runner - input runner
   * @param input - additional input overrides default input and send to runner
   */
  async exec(runner: Runner<Input, Context>, input?: Partial<Input>) {
    try {
      const base = await this.builder(this.context);
      const data = {
        input: deepMerge(base, input),
      };

      await runner(data, this.context);
    } catch (error) {
      setFailed(error as Error);
    }
  }
}

export { Actions };
