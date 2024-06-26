import type { Builder, DataFromBuilder } from "../builders/builder.type";
import type { BaseContext } from "../contexts";

/**
 * App {@link Runner} data
 * @public
 */
export interface RunnerData<I> {
  input?: I;
  error?: Error;
}

/**
 * App runner executes when action has been called
 * @public
 */
export type Runner<C extends BaseContext, I> = (
  data: RunnerData<I>,
  context: C
) => void | Promise<void>;

type DataBuilder<C extends BaseContext, I> = (context: C) => I | Promise<I>;

/**
 * A input data builder
 * @public
 */
export type InputBuilder<C extends BaseContext, I> = DataBuilder<C, I>;

/**
 * A runner data builder
 * @public
 */
export type RunnerDataBuilder<C extends BaseContext, I> = DataBuilder<
  C,
  RunnerData<I>
>;

/**
 * A interface of app object
 * @public
 */
export interface BaseApp<C extends BaseContext, I> {
  readonly context: C;

  /**
   * run the input runner with app data and context
   *
   * @param runner - app runner
   * @param input - overriden input value of current run
   */
  run(runner: Runner<C, I>, input?: Partial<I>): Promise<void>;
}

/**
 * Hook callback with generic parameters
 * @public
 */
export type Hook<C extends BaseContext, R extends unknown[]> = (
  context: C,
  ...args: R
) => void;

/**
 * Application hooks collection
 * @public
 */
export interface AppHooks<C extends BaseContext, I> {
  /** before doing anything */
  beforeInit?: Hook<C, []>;
  /** after fetch data from data builder */
  afterFetchData?: Hook<C, [RunnerData<I>]>;
  /** after merge data from direct input */
  afterMergeData?: Hook<C, [RunnerData<I>]>;
  /** before start the runner */
  beforeRunner?: Hook<C, [RunnerData<I>]>;
  /** after the runner finished */
  afterRunner?: Hook<C, [RunnerData<I>]>;
  /**
   * after application failed
   *
   * @defaultValue `setFailed`
   */
  afterFail?: Hook<C, [Error]>;
  /** after finish running regardless of the result */
  afterFinish?: Hook<C, []>;
}

/**
 * A helper type for app runner
 * @public
 */
export type AppRunner<APP> =
  APP extends BaseApp<infer C, infer I> ? Runner<C, I> : never;

/**
 * A helper type for app builder runner
 * @public
 */
export type AppBuilderRunner<B extends Builder<unknown>> = AppRunner<
  DataFromBuilder<B>
>;

/**
 * A helper type for extract context from app
 * @public
 */
export type AppContext<APP> = APP extends BaseApp<infer C, unknown> ? C : never;

/**
 * A helper type for extract context from app builder
 * @public
 */
export type AppBuilderContext<B extends Builder<unknown>> = AppContext<
  DataFromBuilder<B>
>;

/**
 * A helper type for extract data from app
 * @public
 */
export type AppData<APP> =
  APP extends BaseApp<BaseContext, infer I> ? I : never;

/**
 * A helper type for extract data from app builder
 * @public
 */
export type AppBuilderData<B extends Builder<unknown>> = AppData<
  DataFromBuilder<B>
>;
