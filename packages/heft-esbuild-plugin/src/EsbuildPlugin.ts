import type {
  HeftConfiguration,
  IHeftTaskPlugin,
  IHeftTaskSession,
} from "@rushstack/heft";

import { join } from "node:path";
import { BuildOptions, build } from "esbuild";

import { PLUGIN_NAME } from "./shared";

type EsBuildOptionWhitelist =
  | "bundle"
  | "minify"
  | "sourcemap"
  | "platform"
  | "target";

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
      throw new Error(
        `Esbuild is only available when running without watch mode.`
      );
    }

    session.hooks.run.tapPromise(PLUGIN_NAME, async () => {
      const entry = join(
        heftConfiguration.buildFolderPath,
        heftConfiguration.projectPackageJson.main ?? ""
      );

      const output = options?.output ?? "lib-bundle";
      const outdir = join(heftConfiguration.buildFolderPath, output);
      await build({
        entryPoints: [entry],
        outdir: outdir,
        bundle: options?.bundle ?? true,
        minify: options?.minify ?? true,
        sourcemap: options?.sourcemap ?? false,
        platform: options?.platform,
        target: options?.target,
      });
    });
  }
}

export default EsbuildPlugin;
