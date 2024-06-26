import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for environment variables
 * @public
 */
export type IEnvContext = BaseContext;

/**
 * The ContextPlugin interface for environment variables
 * @public
 */
export type IEnvContextPlugin = ContextPlugin<"env", IEnvContext>;

/**
 * Environments data where we will search variables
 * @public
 */
export type Envvars = Record<string, string | undefined | null>;
