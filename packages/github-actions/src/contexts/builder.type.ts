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
 * A base plugin class for extends context functionility
 * @public
 */
export interface ContextPlugin<NAME extends string> {
  readonly name: NAME;

  init: (context: BaseContext) => void;
}

/**
 * A collection of plugins in Context class
 * @internal
 */
export type Plugins = Record<string, ContextPlugin<string>>;
