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
import { UNSUPPORTED_WATCH_MODE } from "./shared";

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
  const base = {
    buildFolderPath: "/tmp/build",
    projectPackageJson: {
      name: "example",
      version: "v0.1.0",
    },
  } as HeftConfiguration;

  return Object.assign(base, config);
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

  it("should call build(<default>) when applied plugin", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {};

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith({
      bundle: true,
      entryPoints: ["/tmp/build"],
      minify: true,
      outdir: "/tmp/build/lib-bundle",
      sourcemap: false,
    });
  });

  it("should call build() when applied plugin with main field", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
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
    expect(build).toHaveBeenCalledWith({
      bundle: true,
      entryPoints: ["/tmp/build/lib/start.js"],
      minify: true,
      outdir: "/tmp/build/lib-bundle",
      sourcemap: false,
    });
  });

  it("should call build() when platform and target exist", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {
      platform: "browser",
      target: ["node12", "chrome"],
    };

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith({
      bundle: true,
      entryPoints: ["/tmp/build"],
      minify: true,
      outdir: "/tmp/build/lib-bundle",
      sourcemap: false,
      platform: "browser",
      target: ["node12", "chrome"],
    });
  });

  it("should call build() when override entrypoint", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {
      entrypoint: "lib/index.js",
    };

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith({
      bundle: true,
      entryPoints: ["/tmp/build/lib/index.js"],
      minify: true,
      outdir: "/tmp/build/lib-bundle",
      sourcemap: false,
    });
  });

  it("should call build() when override entrypoints", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession();
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {
      entrypoints: ["lib/index.js", "lib/start.js"],
    };

    plugin.apply(session, config, options);
    await session.hooks.run.promise(undefined!);

    expect(build).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledWith({
      bundle: true,
      entryPoints: ["lib/index.js", "lib/start.js"],
      minify: true,
      outdir: "/tmp/build/lib-bundle",
      sourcemap: false,
    });
  });

  it("should error when watch mode enabled", async () => {
    const plugin = new EsbuildPlugin();

    const session = mockTaskSession({ watch: true });
    const config = mockHeftConfiguration();
    const options: IEsbuildOption = {};

    expect(() => {
      plugin.apply(session, config, options);
    }).toThrow(UNSUPPORTED_WATCH_MODE);
  });
});
