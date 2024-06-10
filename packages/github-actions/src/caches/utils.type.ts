/**
 * Option to append system info to cache key
 * @public
 */
export interface SystemCacheKeyOption {
  /** @defaultValue true */
  platform?: boolean;
  /** @defaultValue true */
  arch?: boolean;
}

/**
 * A options to how cache key will be built
 * @public
 */
export interface CacheKeyOption {
  /**
   * Include action name to output cache key
   * @defaultValue true
   */
  actionName?: boolean;
  system?: boolean | SystemCacheKeyOption;
  custom?: string[] | null;
}
