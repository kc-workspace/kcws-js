import type {
  IIOContextPlugin,
  IOCopyOptions,
  IOGlobOptions,
  IOMoveOptions,
} from "./index.type";

import { isDebug } from "@actions/core";
import { mv, cp } from "@actions/io";
import { create, hashFiles } from "@actions/glob";

/**
 * Context Plugin allows user to manages IO operation
 * @public
 */
export class IOContextPlugin implements IIOContextPlugin {
  readonly name = "io" as const;
  readonly dependencies = [] as const;

  init() {
    // we didn't initiate anything from context
  }

  /**
   * Moves file/folder from source path to destination
   *
   * @param source - source path
   * @param dest - destination path
   * @param options - move options
   *
   * @see https://github.com/actions/toolkit/tree/main/packages/io
   */
  move(source: string, dest: string, options?: IOMoveOptions) {
    return mv(source, dest, options);
  }

  /**
   * Copies file/folder from source path to destination
   *
   * @param source - source path
   * @param dest - destination path
   * @param options - copy options
   *
   * @see https://github.com/actions/toolkit/tree/main/packages/io
   */
  copy(source: string, dest: string, options?: IOCopyOptions) {
    return cp(source, dest, options);
  }
  /**
   * Create glob object with input patterns
   *
   * @param pattern - patterns separated by newlines
   * @param options - glob options
   * @returns globber object
   *
   * @see https://github.com/actions/toolkit/tree/main/packages/glob
   */
  createGlob(pattern: string, options?: IOGlobOptions) {
    return create(pattern, options);
  }

  /**
   * Computes the sha256 hash of a glob
   *
   * @param pattern - patterns separated by newlines
   * @param cwd - workspace used when matching files
   * @returns file hash string
   *
   * @see https://github.com/actions/toolkit/tree/main/packages/glob
   */
  hash(pattern: string, cwd?: string) {
    return hashFiles(pattern, cwd, { followSymbolicLinks: true }, isDebug());
  }
}
