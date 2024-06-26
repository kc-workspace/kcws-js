import type {
  BaseContext,
  ContextPlugin,
  InputContextPlugin,
  LogContextPlugin,
  ToPluginsObject,
} from "../..";

/**
 * The Context interface for shell executor
 * @public
 */
export type IExecContext = BaseContext<
  ToPluginsObject<[LogContextPlugin, InputContextPlugin]>
>;

/**
 * The ContextPlugin interface shell executor
 * @public
 */
export type IExecContextPlugin = ContextPlugin<"exec", IExecContext>;

/**
 * The result from {@link ExecContextPlugin} capture function
 *
 * @public
 */
export interface CapturedResult {
  stdout?: Buffer;
  stderr?: Buffer;
  code: number;
}
