import type { BaseContext, ContextPlugin, Plugins } from "./builder.type";

import { resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";

/**
 * For create Context builder
 * @beta
 */
export class ContextBuilder<PS extends Plugins = NonNullable<unknown>> {
  static readonly defaultVersion: string = "v0.0.0-dev";

  private plugins: PS;

  /**
   * Special create function to create empty context builder.
   * No default value will applied to context builder.
   *
   * @returns empty context builder
   *
   * @public
   */
  static empty() {
    return new ContextBuilder("", "");
  }

  /**
   * create context builder from input value
   *
   * @param name - application name
   * @param version - application version
   * @returns context builder from input value
   *
   * @public
   */
  static fromInput(name?: string, version?: string) {
    return new ContextBuilder(
      name ?? "",
      version ?? ContextBuilder.defaultVersion
    );
  }

  /**
   * Create context builder from package.json file.
   *   - package.json missing: both name and version will be empty.
   *   - package.json found: version will default to {@link ContextBuilder.defaultVersion} if not found.
   *
   * @param basedir - custom base directory for resolve package.json file
   * @param filename - custom package.json file name
   * @returns context builder from package.json
   *
   * @public
   */
  static fromPackageJson(
    basedir: string = __dirname,
    filename: string = "package.json"
  ) {
    const fullpath = resolve(basedir, filename);
    if (existsSync(fullpath)) {
      const content = readFileSync(fullpath, {
        encoding: "utf8",
      });
      const pkg = JSON.parse(content);
      return ContextBuilder.fromInput(
        pkg.name ?? "",
        pkg.version ?? ContextBuilder.defaultVersion
      );
    }
    return ContextBuilder.empty();
  }

  /**
   * create context builder from input base context.
   * BaseContext contains only application name and application version.
   *
   * @param context - base context for new ContextBuilder
   * @returns context builder with input context as base value
   *
   * @public
   */
  static fromBaseContext(context: BaseContext) {
    return new ContextBuilder(context.name, context.version);
  }

  /**
   * create context builder from another default context.
   * This will included name, version, and plugins
   *
   * @param context - default context for new ContextBuilder
   * @returns context builder with input context as base value
   *
   * @public
   */
  static fromContext<Context extends DefaultContext>(
    context: Context
  ): ContextBuilder<Context["plugins"]> {
    return new ContextBuilder(context.name, context.version).setPlugins(
      context.plugins
    );
  }

  private constructor(
    private name: string,
    private version: string
  ) {
    this.plugins = {} as PS;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  setPlugins<NPS extends Plugins = NonNullable<unknown>>(
    plugins: NPS
  ): ContextBuilder<NPS> {
    const output = this as unknown as ContextBuilder<NPS>;
    output.plugins = plugins;
    return output;
  }

  addPlugin<
    P extends ContextPlugin<
      DefaultContext<PS>,
      string,
      (keyof PS extends string ? keyof PS : never)[]
    >,
  >(plugin: P) {
    this.plugins[plugin.name as keyof PS] = plugin as unknown as PS[P["name"]];
    return this as unknown as ContextBuilder<PS & { [key in P["name"]]: P }>;
  }

  build(): DefaultContext<PS> {
    return new DefaultContext(this.name, this.version, this.plugins);
  }
}

/**
 * A Default context when using {@link ContextBuilder}
 * @public
 */
export class DefaultContext<PLUGINS extends Plugins = NonNullable<unknown>>
  implements BaseContext
{
  constructor(
    /** application name */
    readonly name: string,
    /** application version */
    readonly version: string,
    /**
     * Context plugins.
     * You should not use plugin directly, instead call {@link DefaultContext.use} instead.
     *
     * @internal
     */
    readonly plugins: PLUGINS
  ) {
    const initiatedPlugins = {} as Record<keyof PLUGINS, boolean>;
    for (const key in plugins) {
      initiatedPlugins[key] = false;
    }

    // Initiate plugins
    for (const key of Object.keys(plugins)) {
      if (initiatedPlugins[key] === false) {
        for (const dependency of plugins[key].dependencies) {
          if (initiatedPlugins[dependency] === false) {
            plugins[dependency].init(this);
            initiatedPlugins[dependency as keyof PLUGINS] = true;
          }
        }
        plugins[key].init(this);
        initiatedPlugins[key as keyof PLUGINS] = true;
      }
    }
  }

  use<N extends keyof PLUGINS>(name: N): PLUGINS[N] {
    return this.plugins[name];
  }
}
