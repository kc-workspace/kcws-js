import type { BaseContext } from "../contexts";
import type { AppHooks, BaseApp, Runner, RunnerDataBuilder } from "./app.type";

import { setFailed } from "@actions/core";

import { deepMerge } from "../utils/objects";

/**
 * The Actions app for executes runner.
 * You should use {@link AppBuilder} to create this App
 * @public
 */
export class App<C extends BaseContext, I> implements BaseApp<C, I> {
  readonly context: C;

  private readonly dataBuilder: RunnerDataBuilder<C, I>;
  private readonly hooks: AppHooks<C, I> | undefined;
  constructor(
    context: C,
    dataBuilder: RunnerDataBuilder<C, I>,
    hooks?: AppHooks<C, I>
  ) {
    this.context = context;
    this.dataBuilder = dataBuilder;
    this.hooks = hooks;
  }

  /**
   * run input runner with context and data.
   *
   * @param runner - runner function
   * @param input - direct input overrides existed data
   */
  async run(
    runner: Runner<C, I>,
    input?: Partial<I> | undefined
  ): Promise<void> {
    this.hooks?.beforeInit?.(this.context);

    try {
      const base = await this.dataBuilder(this.context);
      this.hooks?.afterFetchData?.(this.context, base);

      const data = deepMerge(base, { input: input as I });
      this.hooks?.afterMergeData?.(this.context, data);

      this.hooks?.beforeRunner?.(this.context, data);
      await runner(data, this.context);
      this.hooks?.afterRunner?.(this.context, data);
    } catch (error) {
      const _error = error as Error;

      if (this.hooks?.afterFail) this.hooks.afterFail(this.context, _error);
      else setFailed(_error);
    } finally {
      this.hooks?.afterFinish?.(this.context);
    }
  }
}
