jest.mock("esbuild");

import type {
  HeftConfiguration,
  IHeftParameters,
  IHeftTaskHooks,
  IHeftTaskRunHookOptions,
  IHeftTaskRunIncrementalHookOptions,
  IHeftTaskSession,
} from "@rushstack/heft";

import { AsyncParallelHook } from "tapable";
import { build } from "esbuild";
import { StringBufferTerminalProvider, Terminal } from "@rushstack/terminal";
import { MockScopedLogger } from "@rushstack/heft/lib/pluginFramework/logging/MockScopedLogger";

import EsbuildPlugin, { IEsbuildOption } from "./EsbuildPlugin";

const mockTaskSession = (
  parameters?: Partial<IHeftParameters>
): IHeftTaskSession => {
  const terminalProvider = new StringBufferTerminalProvider(false);
  const terminal = new Terminal(terminalProvider);
  const logger = new MockScopedLogger(terminal);

  const _parameters: IHeftParameters = Object.assign(
    { watch: false },
    parameters
  ) as IHeftParameters;

  return {
    logger,
    parameters: _parameters,
    hooks: {
      run: new AsyncParallelHook<IHeftTaskRunHookOptions>(),
      runIncremental:
        new AsyncParallelHook<IHeftTaskRunIncrementalHookOptions>(),
    } as IHeftTaskHooks,
    parsedCommandLine: undefined!,
    requestAccessToPluginByName: undefined!,
    taskName: "esbuild",
    tempFolderPath: "/tmp/test",
  };
};

const mockHeftConfiguration = (
  config?: Partial<HeftConfiguration>
): HeftConfiguration => {
  return Object.assign({}, config) as HeftConfiguration;
};

describe("Esbuild heft-plugin", () => {
  it("should create with parameterless constructor", () => {
    const plugin = new EsbuildPlugin();
    expect(plugin).not.toBeFalsy();
  });

  it("should return undefined as accessor", () => {
    const plugin = new EsbuildPlugin();
    expect(plugin.accessor).toBeUndefined();
  });

  it("should call esbuild.build() when hook run called", () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {};

    plugin.apply(session, config, options);
    session.hooks.run.call(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
  });
});
