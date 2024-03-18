import type {
  HeftConfiguration,
  IHeftTaskPlugin,
  IHeftTaskSession,
} from "@rushstack/heft";

import { join } from "node:path";
import { existsSync } from "node:fs";
import { BuildOptions, build, version } from "esbuild";

import { PLUGIN_NAME, UNSUPPORTED_WATCH_MODE } from "./shared";

type EsBuildOptionWhitelist =
  | "bundle"
  | "minify"
  | "sourcemap"
  | "platform"
  | "target";

/**
 * The options for esbuild build() function.
 *
 * @public
 */
export interface IEsbuildOption
  extends Pick<BuildOptions, EsBuildOptionWhitelist> {
  /** The default entrypoint (default to main field on package.json file) */
  entrypoint?: string;
  /** The entrypoints list that overrides default value */
  entrypoints?: string[];
  /** Output directory name (default is 'lib-bundle') */
  output?: string;
}

class EsbuildPlugin implements IHeftTaskPlugin<IEsbuildOption> {
  private _accessor: undefined;

  public get accessor(): undefined {
    return this._accessor;
  }

  public apply(
    session: IHeftTaskSession,
    heftConfiguration: HeftConfiguration,
    options?: IEsbuildOption | undefined
  ): void {
    if (session.parameters.watch) {
      throw new Error(UNSUPPORTED_WATCH_MODE);
    }

    session.hooks.run.tapPromise(PLUGIN_NAME, async () => {
      session.logger.terminal.writeLine(`Using esbuild version ${version}`);

      const basePath = heftConfiguration.buildFolderPath;
      const entries = [];
      const length = options?.entrypoints?.length ?? 0;
      if (length > 0) {
        entries.push(
          ...options!
            .entrypoints!.map(p => {
              const output = p.replace("<pwd>", basePath);
              if (existsSync(output)) return output;
              session.logger.terminal.writeWarningLine(
                `Remove '${p}' entrypoint from list because file is missing`
              );
              return "";
            })
            .filter(p => p !== "")
        );
      } else {
        const main =
          heftConfiguration.projectPackageJson.main ??
          options?.entrypoint ??
          "";
        entries.push(join(basePath, main));
      }

      const output = options?.output ?? "lib-bundle";
      const outdir = join(basePath, output);
      const buildOptions: BuildOptions = {
        entryPoints: entries,
        outdir: outdir,
        bundle: options?.bundle ?? true,
        minify: options?.minify ?? true,
        sourcemap: options?.sourcemap ?? false,
      };

      if (options?.platform) buildOptions.platform = options.platform;
      if (options?.target) buildOptions.target = options.target;
      await build(buildOptions);
    });
  }
}

export default EsbuildPlugin;
