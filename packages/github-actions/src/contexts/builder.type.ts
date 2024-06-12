export type PrimitiveType = string | number | boolean;

/**
 * Base interface for all Context class
 * @public
 */
export interface BaseContext {
  /** Application name */
  readonly name: string;
  /** Application version */
  readonly version: string;
}

/**
 * A base plugin class for extends context functionality
 * @public
 */
export interface ContextPlugin<
  CONTEXT extends BaseContext,
  NAME extends string,
  DEPS extends string[] = never[],
> {
  readonly dependencies: DEPS;
  readonly name: NAME;

  init: (context: CONTEXT) => void;
}

/**
 * A collection of plugins in Context class
 * @internal
 */
export type Plugins = Record<string, ContextPlugin<BaseContext, string>>;
