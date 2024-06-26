import type { ContextBuilder } from "./builder";
import type { Plugins } from "./plugins";

/**
 * A interface of context object
 * @public
 */
export interface BaseContext<
  PLUGINS extends Plugins<BaseContext, string[]> = NonNullable<unknown>,
> {
  /** Application name */
  readonly name: string;
  /** Application version */
  readonly version: string;
  /** Context plugins */
  readonly plugins: PLUGINS;

  use<K extends keyof PLUGINS>(name: K): PLUGINS[K];
  has(name: string): boolean;

  merge<PS extends Plugins>(
    context: BaseContext<PS>
  ): BaseContext<PLUGINS & PS>;
}

/**
 * A helper type for get context builder from context object
 * @public
 */
export type ContextBuilderFromContext<CONTEXT extends BaseContext> =
  ContextBuilder<CONTEXT["plugins"]>;

/**
 * A helper type for merging 2 context plugins together
 * @public
 */
export type ContextMerged<
  CONTEXT1 extends BaseContext,
  CONTEXT2 extends BaseContext,
> = BaseContext<CONTEXT1["plugins"] & CONTEXT2["plugins"]>;
