import type { BaseContext, DefaultContext } from "../contexts";
import type { Actions } from ".";

/**
 * The base data for actions runner
 * @internal
 */
export interface BaseData<Input> {
  input: Input;
}

/**
 * A function for build input value
 * @internal
 */
export type InputBuilder<
  Input,
  Context extends BaseContext = DefaultContext,
> = (context: Context) => Input;

/**
 * Actions runner to executes when action has been called
 * @public
 */
export type Runner<Input, Context extends BaseContext = DefaultContext> = (
  data: BaseData<Input>,
  context: Context
) => Promise<void> | void;

/**
 * A helper type for create Runner based on input Actions app
 * @public
 */
export type AppRunner<App> =
  App extends Actions<infer I, infer C> ? Runner<I, C> : never;
