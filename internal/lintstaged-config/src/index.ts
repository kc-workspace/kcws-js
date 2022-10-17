import type { ConfigFn } from "./models/ConfigFn";
import type { Config } from "./models/Config";

import micromatch, { type Options } from "micromatch";

export { Config, ConfigCondition } from "./models/Config";
export * from "./actions/eslint";
export * from "./actions/prettier";

export default <K extends string>(config: Config<K>): ConfigFn => {
  const options: Options = {
    dot: true,
  };

  return async (stagedFiles) => {
    return await config.getCommands((regexs) => {
      return micromatch(stagedFiles, regexs, options);
    });
  };
};
