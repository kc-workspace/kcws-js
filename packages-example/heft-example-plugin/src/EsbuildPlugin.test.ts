import type {
  HeftConfiguration,
  IHeftParameters,
  IHeftTaskHooks,
  IHeftTaskRunHookOptions,
  IHeftTaskRunIncrementalHookOptions,
  IHeftTaskSession,
} from "@rushstack/heft";

import { AsyncParallelHook } from "tapable";
import { StringBufferTerminalProvider, Terminal } from "@rushstack/terminal";
import { MockScopedLogger } from "@rushstack/heft/lib/pluginFramework/logging/MockScopedLogger";

import ExamplePlugin from "./ExamplePlugin";

const mockTaskSession = (
  parameters?: Partial<IHeftParameters>
): { session: IHeftTaskSession; terminal: StringBufferTerminalProvider } => {
  const terminalProvider = new StringBufferTerminalProvider(false);
  const terminal = new Terminal(terminalProvider);
  const logger = new MockScopedLogger(terminal);

  const _parameters: IHeftParameters = Object.assign(
    { watch: false },
    parameters
  ) as IHeftParameters;

  const session = {
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
  return { session, terminal: terminalProvider };
};

const mockHeftConfiguration = (
  config?: Partial<HeftConfiguration>
): HeftConfiguration => {
  const base = {
    buildFolderPath: "/tmp/build",
    projectPackageJson: {
      name: "example",
      version: "v0.1.0",
    },
  } as HeftConfiguration;

  return Object.assign(base, config);
};

describe("Example heft-plugin", () => {
  it("should create with parameterless constructor", () => {
    const plugin = new ExamplePlugin();
    expect(plugin).not.toBeFalsy();
  });

  it("should return undefined as accessor", () => {
    const plugin = new ExamplePlugin();
    expect(plugin.accessor).toBeUndefined();
  });

  it("should do something", async () => {
    const plugin = new ExamplePlugin();
    const { session, terminal } = mockTaskSession();
    const config = mockHeftConfiguration();

    plugin.apply(session, config);
    await session.hooks.run.promise(undefined!);

    expect(terminal.getOutput()).toMatchSnapshot();
  });
});
