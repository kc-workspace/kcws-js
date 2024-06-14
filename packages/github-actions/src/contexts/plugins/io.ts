import type { BaseContext, ContextPlugin } from "../builder.type";
import type { IOCopyOptions, IOMoveOptions, IOGlobOptions } from "./io.type";

import { isDebug } from "@actions/core";
import { which as _which, mv, cp } from "@actions/io";
import { create, hashFiles } from "@actions/glob";

/**
 * Context Plugin allows user to manage IO operation (e.g. files/folders)
 * @public
 */
export class IOContextPlugin implements ContextPlugin<BaseContext, "io"> {
  readonly name = "io";
  readonly dependencies = [];

  init() {}

  /**
   * {@inheritDoc _which}
   */
  which(tool: string, check: boolean) {
    return _which(tool, check);
  }

  /** {@inheritDoc mv} */
  move(source: string, dest: string, options?: IOMoveOptions) {
    return mv(source, dest, options);
  }

  /** {@inheritDoc cp} */
  copy(source: string, dest: string, options?: IOCopyOptions) {
    return cp(source, dest, options);
  }

  /** {@inheritDoc create} */
  createGlob(pattern: string, options?: IOGlobOptions) {
    return create(pattern, options);
  }

  /** {@inheritDoc hashFiles} */
  hash(pattern: string, cwd?: string) {
    const verbose = isDebug();
    return hashFiles(pattern, cwd, { followSymbolicLinks: true }, verbose);
  }
}
