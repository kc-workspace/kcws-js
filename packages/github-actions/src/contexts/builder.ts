import type { Plugins, ContextPlugin } from "./plugins";
import type { BaseContext } from "./context.type";
import type { Builder } from "../builders/builder.type";

import { dirname, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";

import { DefaultContext } from "./default";
import { FileNotFound } from "../errors";

/**
 * DefaultContext builder.
 *
 * @public
 */
export class ContextBuilder<PLUGINS extends Plugins = NonNullable<unknown>>
  implements Builder<BaseContext<PLUGINS>>
{
  static readonly defaultName = "";
  static readonly defaultVersion = "v0.0.0-dev";

  /**
   * Create empty builder.
   * Empty means all metadata will be empty string
   *
   * @returns builder
   */
  static empty() {
    return new ContextBuilder("", "");
  }

  /**
   * Create builder with input metadata
   *
   * @param name - input application name (if not found {@link ContextBuilder.defaultName} will be use)
   * @param version - input application version (if not found {@link ContextBuilder.defaultVersion} will be use)
   * @returns builder
   */
  static fromInput(name?: string, version?: string) {
    return new ContextBuilder(
      name ?? ContextBuilder.defaultName,
      version ?? ContextBuilder.defaultVersion
    );
  }

  /**
   * Create builder from package.json file.
   * This will recursive upward untils it reach root directory.
   *
   * @param basedir - base directory of package.json
   * @param filename - package.json file name
   * @returns builder
   *
   * @throws {@link FileNotFound}
   * Thrown if package.json file is missing
   */
  static fromPackageJson(basedir: string, filename: string = "package.json") {
    let current = basedir;
    while (!existsSync(resolve(current, filename))) {
      if (current === "." || current === "/")
        throw new FileNotFound(basedir, filename);
      current = dirname(current);
    }

    const fullpath = resolve(current, filename);
    const content = readFileSync(fullpath, {
      encoding: "utf8",
    });
    const pkg = JSON.parse(content);
    return ContextBuilder.fromInput(pkg.name, pkg.version);
  }

  /**
   * Create builder from existed BaseContext
   *
   * @param context - input context
   * @returns builder
   */
  static fromContext<CTX extends BaseContext = BaseContext>(context: CTX) {
    return ContextBuilder.fromInput(context.name, context.version).setPlugins<
      CTX["plugins"]
    >(context.plugins);
  }

  private name: string;
  private version: string;
  private plugins: PLUGINS;

  private constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
    this.plugins = {} as PLUGINS;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  setPlugins<PS extends Plugins = NonNullable<unknown>>(plugins: PS) {
    const output = this as unknown as ContextBuilder<PS>;
    output.plugins = plugins;
    return output;
  }

  addPlugin<
    P extends ContextPlugin<
      string,
      BaseContext<PLUGINS>,
      (keyof PLUGINS extends string ? keyof PLUGINS : never)[]
    >,
  >(plugin: P) {
    type PNAME = P["name"];
    const output = this as unknown as ContextBuilder<
      PLUGINS & Record<PNAME, P>
    >;

    type PVAL = (typeof output)["plugins"][PNAME];
    output.plugins[plugin.name as PNAME] = plugin as PVAL;
    return output;
  }

  build(): BaseContext<PLUGINS> {
    return new DefaultContext(this.name, this.version, this.plugins);
  }
}
