import type {
  BaseContext,
  ContextPlugin,
  EnvContextPlugin,
  ToPluginsObject,
} from "../..";

/**
 * The Context interface for input data
 * @public
 */
export type IInputContext = BaseContext<ToPluginsObject<[EnvContextPlugin]>>;

/**
 * The ContextPlugin interface input data
 * @public
 */
export type IInputContextPlugin = ContextPlugin<"input", IInputContext>;
