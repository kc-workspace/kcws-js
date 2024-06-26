import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for output data
 * @public
 */
export type IOutputContext = BaseContext;

/**
 * The ContextPlugin interface for output data
 * @public
 */
export type IOutputContextPlugin = ContextPlugin<"output", IOutputContext>;
