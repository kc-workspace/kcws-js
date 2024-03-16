import type {
  HeftConfiguration,
  IHeftTaskPlugin,
  IHeftTaskSession,
} from "@rushstack/heft";

import { PLUGIN_NAME } from "./shared";

/**
 * The options for esbuild build() function.
 *
 * @public
 */
export interface IExampleOption {
  /** The example option field */
  example?: string;
}

class ExamplePlugin implements IHeftTaskPlugin<IExampleOption> {
  public static DEFAULT_MESSAGE: string = `Using example to do nothing`;
  private _accessor: undefined;

  public get accessor(): undefined {
    return this._accessor;
  }

  public apply(
    session: IHeftTaskSession,
    _heftConfiguration: HeftConfiguration,
    _options?: IExampleOption | undefined
  ): void {
    session.hooks.run.tapPromise(PLUGIN_NAME, async () => {
      session.logger.terminal.writeLine(ExamplePlugin.DEFAULT_MESSAGE);
      // Your logic should be here...
    });
  }
}

export default ExamplePlugin;
