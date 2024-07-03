import type { BaseContext } from "./context.type";
import type { Plugins } from "./plugins/index.type";

import { ContextPluginNotFound } from "../errors";

/**
 * Default context implementation.
 * Support plugins, application metadata and lazy initiate plugin.
 *
 * @public
 */
export class DefaultContext<
  PLUGINS extends Plugins<DefaultContext, string[]> = NonNullable<unknown>,
> implements BaseContext<PLUGINS>
{
  /** Application name */
  readonly name: string;
  /** Application version */
  readonly version: string;
  /** Plugins map. Do not use this directly, please use {@link DefaultContext.use} function instead */
  readonly plugins: PLUGINS;

  private readonly initiatedPlugins: Map<string, true>;
  constructor(name: string, version: string, plugins: PLUGINS) {
    this.name = name;
    this.version = version;
    this.plugins = plugins;

    this.initiatedPlugins = new Map();
  }

  /**
   * Initiate all plugins instead of lazy initiate when use.
   * @param force - bypass initate check and force initiate all plugins
   */
  init(force: boolean = false) {
    for (const key in this.plugins) {
      this.initPlugin(key, force);
    }
  }

  /**
   * Get plugin by name.
   * If plugin never initiate before, this will initiate for you.
   *
   * @param name - plugin name
   * @returns plugin object
   *
   * @throws {@link ContextPluginNotFound}
   * Thrown if plugin is missing from context
   */
  use<K extends keyof PLUGINS>(name: K): PLUGINS[K] {
    return this.initPlugin(name);
  }

  /**
   * Check whether plugin input name exist or not
   * @param name - plugin name
   * @returns true if plugin existed
   */
  has(name: string): boolean {
    const plugin = this.plugins[name];
    return plugin !== undefined;
  }

  /**
   * merge context together but retain all metadata of current context
   *
   * @param context - another context
   * @returns context with current metadata and both plugins
   */
  merge<PS extends Plugins<BaseContext, string[]>>(context: BaseContext<PS>) {
    const output = this as unknown as DefaultContext<PLUGINS & PS>;
    for (const name in context.plugins) {
      if (!this.has(name)) {
        (output.plugins as Plugins<BaseContext, string[]>)[name] =
          context.plugins[name];
      }
    }

    return output;
  }

  private initPlugin<K extends keyof PLUGINS>(
    name: K,
    force: boolean = false
  ): PLUGINS[K] {
    const plugin = this.getPlugin(name);
    if (!this.isPluginInit(name) || force) {
      const dependencies = plugin.dependencies;
      for (const depName of dependencies) {
        if (!this.isPluginInit(depName) || force) {
          const dependency = this.getPlugin(depName);
          dependency.init(this);
          this.setPluginInit(depName);
        }
      }
      plugin.init(this);
      this.setPluginInit(name);
    }
    return plugin;
  }

  private isPluginInit<K extends keyof PLUGINS>(name: K): boolean {
    return this.initiatedPlugins.has(name as string) === true;
  }

  private setPluginInit<K extends keyof PLUGINS>(name: K) {
    this.initiatedPlugins.set(name as string, true);
  }

  /**
   * get plugin by name
   *
   * @param name - plugin name
   * @returns plugin object
   *
   * @throws {@link ContextPluginNotFound}
   * Thrown if plugin is missing from context
   *
   * @internal
   */
  private getPlugin<K extends keyof PLUGINS>(name: K): PLUGINS[K] {
    const plugin = this.plugins[name];
    if (plugin === undefined) throw new ContextPluginNotFound<K>(name);
    return plugin;
  }
}
