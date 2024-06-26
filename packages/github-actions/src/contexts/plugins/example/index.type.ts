import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for example
 * @public
 */
export type IExampleContext = BaseContext;

/**
 * The ContextPlugin interface for example
 * @public
 */
export type IExampleContextPlugin = ContextPlugin<"example", IExampleContext>;
