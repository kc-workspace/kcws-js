jest.mock("esbuild");

import type {
  HeftConfiguration,
  IHeftParameters,
  IHeftTaskFileOperations,
  IHeftTaskHooks,
  IHeftTaskRunHookOptions,
  IHeftTaskRunIncrementalHookOptions,
  IHeftTaskSession,
} from "@rushstack/heft";

import { AsyncParallelHook, AsyncSeriesWaterfallHook } from "tapable";
import { BuildOptions, build } from "esbuild";
import { StringBufferTerminalProvider, Terminal } from "@rushstack/terminal";
import { MockScopedLogger } from "@rushstack/heft/lib/pluginFramework/logging/MockScopedLogger";

import EsbuildPlugin, { IEsbuildOption } from "./EsbuildPlugin";
import { UNSUPPORTED_WATCH_MODE } from "./shared";

const mockTaskHooks = (): IHeftTaskHooks => {
  const run = new AsyncParallelHook<IHeftTaskRunHookOptions>();
  const runIncremental =
    new AsyncParallelHook<IHeftTaskRunIncrementalHookOptions>();
  const registerFileOperations =
    new AsyncSeriesWaterfallHook<IHeftTaskFileOperations>(["register"]);

  return {
    run,
    runIncremental,
    registerFileOperations,
  };
};

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
    hooks: mockTaskHooks(),
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

const buildDefaultOptions = (option?: BuildOptions): BuildOptions => {
  const defaults = {
    bundle: true,
    entryPoints: ["/tmp/build"],
    minify: true,
    outdir: "/tmp/build/lib-bundle",
    sourcemap: false,
  };

  return Object.assign(defaults, option);
};

/* jscpd:ignore-start */
describe("Esbuild heft-plugin", () => {
  it("should create with parameterless constructor", () => {
    const plugin = new EsbuildPlugin();
    expect(plugin).not.toBeFalsy();
  });

  it("should return undefined as accessor", () => {
    const plugin = new EsbuildPlugin();
    expect(plugin.accessor).toBeUndefined();
  });

  it("should call build(<default>) when applied plugin", async () => {
    const plugin = new EsbuildPlugin();

    const { session } = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {};

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith(buildDefaultOptions());
  });

  it("should call build() when applied plugin with main field", async () => {
    const plugin = new EsbuildPlugin();

    const { session } = mockTaskSession();
    const config = mockHeftConfiguration({
      projectPackageJson: {
        name: "example",
        version: "v1.0.0",
        main: "lib/start.js",
      },
    });
    const options: IEsbuildOption = {};

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith(
      buildDefaultOptions({ entryPoints: ["/tmp/build/lib/start.js"] })
    );
  });

  it("should call build() when platform and target exist", async () => {
    const plugin = new EsbuildPlugin();

    const { session } = mockTaskSession();
    const options: IEsbuildOption = {
      platform: "browser",
      target: ["node12", "chrome"],
    };

    plugin.apply(session, mockHeftConfiguration(), options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith(
      buildDefaultOptions({
        platform: "browser",
        target: ["node12", "chrome"],
      })
    );
  });

  it("should call build() when override entrypoint", async () => {
    const plugin = new EsbuildPlugin();

    const { session } = mockTaskSession();
    const options: IEsbuildOption = {
      entrypoint: "hello.js",
    };

    plugin.apply(session, mockHeftConfiguration(), options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith(
      buildDefaultOptions({
        entryPoints: ["/tmp/build/hello.js"],
      })
    );
  });

  it("should call build() when override entrypoints", async () => {
    const plugin = new EsbuildPlugin();

    const { session, terminal } = mockTaskSession();
    const options: IEsbuildOption = {
      entrypoints: ["lib/index.js", "lib/start.js"],
    };

    plugin.apply(session, mockHeftConfiguration(), options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith(
      buildDefaultOptions({
        entryPoints: ["lib/index.js"],
      })
    );
    expect(terminal.getWarningOutput()).toMatchSnapshot();
  });

  it("should error when watch mode enabled", async () => {
    const plugin = new EsbuildPlugin();

    const { session } = mockTaskSession({ watch: true });
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {};

    expect(() => {
      plugin.apply(session, config, options);
    }).toThrow(UNSUPPORTED_WATCH_MODE);
  });
});
/* jscpd:ignore-end */
