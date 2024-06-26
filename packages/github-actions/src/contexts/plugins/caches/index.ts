import type {
  CacheKeyOption,
  ICacheContext,
  ICacheContextPlugin,
} from "./index.type";
import type { LogContextPlugin } from "..";

import { isFeatureAvailable, restoreCache, saveCache } from "@actions/cache";

/**
 * Context Plugin allows user to caching their results
 * @public
 */
export class CacheContextPlugin implements ICacheContextPlugin {
  readonly name = "cache" as const;
  readonly dependencies = ["log"] as const;

  private actionName = "";
  private logger: LogContextPlugin | undefined;

  init(context: ICacheContext) {
    this.actionName = context.name;
    this.logger = context.use("log");
  }

  /**
   * check is current machine support data caching feature or not
   *
   * @returns true if has feature support
   */
  hasFeature() {
    return isFeatureAvailable();
  }

  async restore(option: CacheKeyOption, ...paths: string[]) {
    if (this.hasFeature()) {
      return await restoreCache(
        paths,
        this.getSaveKey(option),
        this.getRestoreKeys(option)
      );
    } else {
      this.logger?.warn(
        "Cannot restore cache because machine isn't support caching"
      );
    }
  }

  async save(option: CacheKeyOption, ...paths: string[]) {
    if (this.hasFeature()) {
      await saveCache(paths, this.getSaveKey(option));
    } else {
      this.logger?.warn(
        "Cannot save cache because machine isn't support caching"
      );
    }
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
