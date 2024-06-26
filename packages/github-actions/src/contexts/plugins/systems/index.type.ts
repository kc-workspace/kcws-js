import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for system
 * @public
 */
export type ISystemContext = BaseContext;

/**
 * The ContextPlugin interface for system
 * @public
 */
export type ISystemContextPlugin = ContextPlugin<"system", ISystemContext>;
