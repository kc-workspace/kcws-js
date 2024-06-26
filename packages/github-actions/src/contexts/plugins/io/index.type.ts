import type { BaseContext, ContextPlugin } from "../..";

/**
 * The Context interface for IO operation
 * @public
 */
export type IIOContext = BaseContext;

/**
 * The ContextPlugin interface for IO operation
 * @public
 */
export type IIOContextPlugin = ContextPlugin<"io", IIOContext>;

export type { GlobOptions as IOGlobOptions } from "@actions/glob";

export type {
  MoveOptions as IOMoveOptions,
  CopyOptions as IOCopyOptions,
} from "@actions/io";
