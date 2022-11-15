import { resolve } from "path";
import { spawnSync } from "child_process";

import { HeftConfiguration, HeftSession, IHeftPlugin } from "@rushstack/heft";
import type { PartialStrykerOptions } from "@stryker-mutator/api/core";
import { JsonSchema } from "@rushstack/node-core-library";

const STRYKER_SCHEMA_PATH: string = resolve(
  __dirname,
  "schemas",
  "heft-stryker-plugin.schema.json"
);

const PLUGIN_NAME: string = "StrykerPlugin";

/**
 * @internal
 */
class StrykerPlugin implements IHeftPlugin {
  public readonly pluginName: string = PLUGIN_NAME;
  public readonly optionsSchema: JsonSchema =
    JsonSchema.fromFile(STRYKER_SCHEMA_PATH);

  public apply(
    heftSession: HeftSession,
    heftConfiguration: HeftConfiguration,
    options?: void | undefined
  ): void {
    const logger = heftSession.requestScopedLogger("stryker");
    logger.terminal.writeLine("Hello from Stryker!");

    const strykerOptions: PartialStrykerOptions = {};

    heftSession.hooks.test.tap(PLUGIN_NAME, ({ hooks }) => {
      hooks.run.tapPromise(PLUGIN_NAME, () => {
        const script = resolve(
          __dirname,
          "..",
          "node_modules",
          ".bin",
          "stryker"
        );
        return this._runMutationTest(script, strykerOptions);
      });
    });
  }

  private _runMutationTest(
    script: string,
    options: PartialStrykerOptions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = spawnSync(script, ["run", "--logLevel", "trace"], {
        encoding: "utf8",
      });
      console.log(output.stdout);
      console.error(output.stderr);
      if (output.error) reject(output.error);
      else resolve();
    });
  }
}

export default new StrykerPlugin();
