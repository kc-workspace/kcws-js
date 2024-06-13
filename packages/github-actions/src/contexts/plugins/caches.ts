import type { BaseContext, ContextPlugin } from "..";
import type { CacheKeyOption } from "./caches.type";

import { restoreCache, saveCache } from "@actions/cache";

/**
 * Context Plugin allows user to caching their results
 * @public
 */
export class CacheContextPlugin implements ContextPlugin<BaseContext, "cache"> {
  readonly name = "cache";
  readonly dependencies = [];

  private actionName = "";

  init(context: BaseContext) {
    this.actionName = context.name;
  }

  async restore(option: CacheKeyOption, ...paths: string[]) {
    await restoreCache(
      paths,
      this.getSaveKey(option),
      this.getRestoreKeys(option)
    );
  }

  async save(option: CacheKeyOption, ...paths: string[]) {
    await saveCache(paths, this.getSaveKey(option));
  }

  /**
   * create save key from input option
   *
   * @param option - key option
   * @returns key string for caching data
   */
  getSaveKey(option: CacheKeyOption) {
    return this.getKeys(option).join("-");
  }

  /**
   * create restore keys list from input option
   *
   * @param option - key option
   * @returns key list for restoring data
   */
  getRestoreKeys(option: CacheKeyOption) {
    const keys = this.getKeys(option).slice(0, -1);
    return keys.map((_, index, keys) => {
      return keys
        .slice(0, keys.length - index)
        .join("-")
        .concat("-");
    });
  }

  private getKeys(option: CacheKeyOption): string[] {
    const keys = [];

    if (option.actionName !== false) keys.push(this.actionName);

    if (option.system === true) keys.push(process.platform, process.arch);
    else if (typeof option.system === "object") {
      if (option.system.platform !== false) keys.push(process.platform);
      if (option.system.arch !== false) keys.push(process.arch);
    }

    if (typeof option.custom === "object" && option.custom !== null)
      keys.push(...option.custom);

    return keys;
  }
}
