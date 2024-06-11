import type { BaseContext, ContextPlugin, Plugins } from "./builder.type";

import { resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";

/**
 * For create Context builder
 * @beta
 */
export class ContextBuilder<PS extends Plugins = NonNullable<unknown>> {
  private plugins: PS;

  static builder(name?: string, version?: string) {
    return new ContextBuilder(name ?? "", version ?? "v0.0.0-dev");
  }

  /**
   * create context builder from package.json file
   *
   * @param path - custom package.json path
   * @returns context from package.json file
   */
  static fromPackageJson(path?: string) {
    return this.builder().fromPackageJson(path);
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

  /**
   * fetch application name and version from package.json file
   *
   * @param path - custom package.json file path
   * @returns this
   */
  fromPackageJson(path?: string): this {
    const fullpath = path ?? resolve(process.cwd(), "package.json");
    if (existsSync(fullpath)) {
      const content = readFileSync(fullpath, { encoding: "utf8" });
      const pkg = JSON.parse(content);

      return this.setName(pkg.name ?? "").setVersion(pkg.version ?? "");
    }

    return this;
  }

  addPlugin<P extends ContextPlugin<string>>(plugin: P) {
    this.plugins[plugin.name as keyof PS] = plugin as unknown as PS[P["name"]];
    return this as unknown as ContextBuilder<PS & Record<P["name"], P>>;
  }

  build(): DefaultContext<PS> {
    return new DefaultContext(this.name, this.version, this.plugins);
  }
}

/**
 * A Default context when using {@link ContextBuilder}
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export class DefaultContext<PLUGINS extends Plugins = {}>
  implements BaseContext
{
  constructor(
    readonly name: string,
    readonly version: string,
    private readonly plugins: PLUGINS
  ) {
    // Initiate plugins
    for (const key of Object.keys(plugins)) plugins[key].init(this);
  }

  use<N extends keyof PLUGINS>(name: N): PLUGINS[N] {
    return this.plugins[name];
  }
}
