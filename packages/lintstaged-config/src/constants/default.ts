import type { Builder } from "../models/Config";

import { prettier, eslint, shellcheck, yamllint } from "../actions";

/**
 * Default possible key
 *
 * @public
 */
export type DefaultKey = "jsts" | "json" | "sh" | "yaml";

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
  builder: Builder<K>
): Builder<K | DefaultKey> => {
  return builder
    .set("jsts", {
      regexs: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      actionFn: (files) => [
        eslint({ files, fix: true, maxWarnings: 0 }),
        prettier({ fix: true, files }),
      ],
    })
    .set("json", {
      regexs: ["**/*.json"],
      actionFn: (files) => prettier({ fix: true, files }),
    })
    .set("sh", {
      regexs: ["**/*.sh", "**/*.bash", "**/*.zsh"],
      actionFn: (files) => shellcheck({ files }),
    })
    .set("yaml", {
      regexs: ["**/*.yaml", "**/*.yml"],
      actionFn: (files) => yamllint({ files }),
    });
};
