/**
 * A programming config for lintstaged.
 *
 * @packageDocumentation
 */

import type { IConfigBuilder, ConfigFn } from "./models/IConfig";

import micromatch, { type Options } from "micromatch";

export * from "./models/IConfig";
export * from "./actions";

export { Config } from "./models/Config";

/**
 * This is a function to define a configuration for lintstaged file.
 *
 * @param builder - a setting for configure lintstaged.
 * @returns a lintstaged configuration.
 * @example
 *    const { default: defineConfig, Config } = require("@kcws/lintstaged-config");
 *    // you can custom your setting via .append() or .set() in Config.builder()
 *    module.exports = defineConfig(Config.builder().default().build());
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
