import type { Builder } from "../models/Config";
import type { IBaseActionOptions } from "../actions/_base";

import {
  prettier,
  eslint,
  shellcheck,
  yamllint,
  type IEslintOptions,
  type IPrettierOptions,
  type IShellcheckOptions,
  type IYamllintOptions,
} from "../actions";

/**
 * Default possible key
 *
 * @public
 */
export type DefaultKey = "jsts" | "json" | "sh" | "yaml";

/**
 * A helper type for select only application options without base action.
 * @beta
 */
export type OnlyAppOptions<T> = Pick<
  T,
  Exclude<keyof T, keyof IBaseActionOptions>
>;

/**
 * Custom type for default configuration builder
 * @beta
 */
export interface CustomDefaultConfig {
  /** custom config for jsts eslint */
  eslint?: OnlyAppOptions<IEslintOptions> | false;
  /** custom config for jsts prettier */
  jstsPrettier?: OnlyAppOptions<IPrettierOptions> | false;
  /** custom config for json prettier */
  jsonPrettier?: OnlyAppOptions<IPrettierOptions> | false;
  /** custom config for shellcheck */
  shellcheck?: OnlyAppOptions<IShellcheckOptions> | false;
  /** custom config for yamllint */
  yamllint?: OnlyAppOptions<IYamllintOptions> | false;
}

/**
 * A function to define default configuration for lintstaged,
 * So you don't have to configure each action by yourself.
 *
 * @param builder - Config.Builder
 * @returns same builder with default configuration
 *
 * @remarks
 *
 * Notes: This function will append default config groups, not replace it.
 *
 * @internal
 */
export const defineDefaultConfig = <K extends string>(
  builder: Builder<K>,
  custom?: CustomDefaultConfig
): Builder<K | DefaultKey> => {
  return builder
    .set("jsts", {
      regexs: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      actionFn: files =>
        [
          custom?.eslint === false
            ? undefined
            : eslint({ files, fix: true, maxWarnings: 0, ...custom?.eslint }),
          custom?.jstsPrettier === false
            ? undefined
            : prettier({ fix: true, files, ...custom?.jstsPrettier }),
        ].filter(v => v !== undefined) as string[],
    })
    .set("json", {
      regexs: ["**/*.json"],
      actionFn: files =>
        custom?.jsonPrettier === false
          ? []
          : prettier({ fix: true, files, ...custom?.jsonPrettier }),
    })
    .set("sh", {
      regexs: ["**/*.sh", "**/*.bash", "**/*.zsh"],
      actionFn: files =>
        custom?.shellcheck === false
          ? []
          : shellcheck({ files, ...custom?.shellcheck }),
    })
    .set("yaml", {
      regexs: ["**/*.yaml", "**/*.yml"],
      actionFn: files =>
        custom?.yamllint === false
          ? []
          : yamllint({ files, ...custom?.yamllint }),
    });
};
