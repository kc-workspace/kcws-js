/**
 * A programming config for lintstaged.
 *
 * @packageDocumentation
 */

import type { IConfigBuilder, ConfigFn } from "./models/IConfig";

import micromatch, { type Options } from "micromatch";

/**
 * This is a function to define a configuration for lintstaged file.
 *
 * @param builder - a setting for configure lintstaged.
 * @returns a lintstaged configuration.
 *
 * @example
 *
 * Use lintstaged-config with default configuration
 * ```ts
 * const { default: defineConfig, Config } = require("@kcws/lintstaged-config");
 * module.exports = defineConfig(Config.default());
 * ```
 *
 * @example
 *
 * Use lintstaged-config with custom configuration
 * ```ts
 * const { default: defineConfig, Config } = require("@kcws/lintstaged-config");
 * module.exports = defineConfig(Config.builder().append("group_name", {}));
 * ```
 *
 * @beta
 */
function defineConfig(builder: IConfigBuilder): ConfigFn {
  const options: Options = {
    dot: true,
  };

  const config = builder.build();
  return async (stagedFiles) => {
    return await config.getCommands((regexs) => {
      return micromatch(stagedFiles, regexs, options);
    });
  };
}

export default defineConfig;

export * from "./models/IConfig";
export * from "./actions/_base";
export * from "./actions";

export { Config } from "./models/Config";

export type { DefaultKey } from "./constants/default";
export type { Builder } from "./models/Config";
