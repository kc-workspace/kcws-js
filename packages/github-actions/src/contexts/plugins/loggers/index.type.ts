import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for log
 * @public
 */
export type ILogContext = BaseContext;

/**
 * The ContextPlugin interface for log
 * @public
 */
export type ILogContextPlugin = ContextPlugin<"log", ILogContext>;

/**
 * Primitive data type log supported
 * @public
 */
export type PrimitiveType = string | number | boolean | undefined;

/**
 * All Datatypes log supported
 * @public
 */
export type LogData =
  | PrimitiveType[]
  | (Record<string, PrimitiveType> | undefined)[];

/**
 * The action executes within the group {@link LogContextPlugin.group}
 * @public
 */
export type GroupRunner<C extends BaseContext, R> = (ctx: C) => R | Promise<R>;
