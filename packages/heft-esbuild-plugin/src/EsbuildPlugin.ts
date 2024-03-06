import type {
  HeftConfiguration,
  IHeftTaskPlugin,
  IHeftTaskSession,
} from "@rushstack/heft";

import { build } from "esbuild";

export interface IEsbuildOption {}

class EsbuildPlugin implements IHeftTaskPlugin<IEsbuildOption> {
  accessor?: object | undefined;

  apply(
    _session: IHeftTaskSession,
    _heftConfiguration: HeftConfiguration,
    _pluginOptions?: IEsbuildOption | undefined
  ): void {
    build({});

    throw new Error("Method not implemented.");
  }
}

export default EsbuildPlugin;
