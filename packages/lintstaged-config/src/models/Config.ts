import type {
  ConfigCondition,
  IConfigValue,
  IConfigBuilder,
  CommandType,
  IConfig,
} from "./IConfig";

import { defineDefaultConfig, type DefaultKey } from "../constants/default";

import { toArray } from "../utils/array";
import { toPromise } from "../utils/promise";
import { isSameMap } from "../utils/map";

const DEBUG_MODE: string = "debug";

/**
 * Config builder. This class should not be created manually.
 * Use {@link Config.builder} or {@link Config.default} instead.
 *
 * @public
 */
class Builder<K extends string> implements IConfigBuilder {
  private _result: Map<string, IConfigValue>;
  private _settings: Map<string, string>;

  /**
   * Do not use this constructor directly.
   * Use {@link Config.builder} or {@link Config.default} instead.
   */
  public constructor() {
    this._result = new Map();
    this._settings = new Map();
  }

  /**
   * enable debug mode when loading configuration
   *
   * @returns this object
   *
   * @public
   */
  public debugMode(): this {
    this._settings.set(DEBUG_MODE, "true");
    return this;
  }

  /**
   * append default actions to current builder
   *
   * @returns this object
   *
   * @public
   */
  public default(): Builder<K | DefaultKey> {
    return defineDefaultConfig(this);
  }

  /**
   * append value to list of regex or actions if needed.
   * If input key never created yet,
   * it will create with input value
   *
   * @param key - group key
   * @param value - config value associate with input key
   * @returns this object
   *
   * @public
   */
  public append<EK extends string>(
    key: EK,
    value: Partial<Exclude<IConfigValue, "actionFn">>
  ): Builder<K | EK> {
    if (this._result.has(key)) {
      const cached = this._result.get(key) as IConfigValue;
      return this.set(key, this._mergeValue(cached, value));
    } else {
      return this.set(key, value);
    }
  }

  /**
   * add new config group to current configuration
   *
   * @param key - group key
   * @param value - config value associate with input key
   * @returns this object
   *
   * @public
   */
  public set<EK extends string>(
    key: EK,
    value: Partial<IConfigValue>
  ): Builder<K | EK> {
    this._result.set(key, this._fillValue(value));
    return this as Builder<K | EK>;
  }

  /**
   * build Config with current builder
   *
   * @returns this object
   *
   * @public
   */
  public build(): Config<K> {
    // I disable eslint here because Config is not used yet
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new Config(this._result as Map<K, IConfigValue>, this._settings);
  }

  /**
   * delete group by key
   *
   * @param key - group key
   * @returns this object
   *
   * @public
   */
  public delete<EK extends K>(key: EK): Builder<Exclude<K, EK>> {
    this._result.delete(key);
    return this as unknown as Builder<Exclude<K, EK>>;
  }

  private _fillValue(value: Partial<IConfigValue>): IConfigValue {
    return {
      regexs: value.regexs ?? [],
      actions: value.actions ?? [],
      actionFn: value.actionFn ?? (() => []),
    };
  }

  private _mergeValue(
    value: IConfigValue,
    addon: Partial<IConfigValue>
  ): IConfigValue {
    const a = toArray(value.actions).map((action) =>
      toPromise(action).then(toArray)
    );
    const b = toArray(addon.actions).map((action) =>
      toPromise(action).then(toArray)
    );

    return {
      regexs: value.regexs.concat(...(addon.regexs ?? [])),
      actions: a.concat(...b),
      actionFn: addon.actionFn ?? value.actionFn,
    };
  }
}

/**
 * Configuration object to generate list of command
 * needed for specify values on {@link ConfigCondition}
 *
 * @public
 */
export class Config<K extends string> implements IConfigBuilder, IConfig {
  /**
   * create config builder with empty value.
   *
   * @returns config builder
   *
   * @public
   */
  public static builder<K extends string = "">(): Builder<K> {
    return new Builder<K>();
  }

  /**
   * create config builder with default group predefined.
   *
   * @returns config builder
   */
  public static default(): Builder<DefaultKey> {
    return new Builder<DefaultKey>().default();
  }

  private _config: Map<K, IConfigValue>;
  private _settings: Map<string, string>;

  public constructor(
    config: Map<K, IConfigValue>,
    settings: Map<string, string>
  ) {
    this._config = config;
    this._settings = settings;
  }

  /**
   * length of configuration.
   *
   * @remarks
   * This can be check to ensure
   * we setting config object correctly
   *
   * @public
   */
  public get length(): number {
    return this._config.size;
  }

  /**
   * is debug mode enabled?
   */
  private get _isDebug(): boolean {
    return (
      this._settings.has(DEBUG_MODE) &&
      this._settings.get(DEBUG_MODE) === "true"
    );
  }

  /**
   * {@inheritDoc IConfig.getCommands}
   * @override
   */
  public async getCommands(condition: ConfigCondition): Promise<Array<string>> {
    const results: Array<string> = [];
    for await (const [key, value] of this._config.entries()) {
      if (this._isDebug) console.log(`verifying ${key}...`);

      const files = condition(value.regexs);
      if (files.length > 0) {
        if (this._isDebug)
          console.log(`found matched files [${files.join(",")}]`);

        // Resolve static actions
        const staticActions = await this._resolveAction(value.actions);
        if (this._isDebug)
          console.log(`static action: [${staticActions.join(",")}]`);

        // Resolve dynamic actions
        const dynamicActions = await this._resolveAction(
          value.actionFn?.(files)
        );
        if (this._isDebug)
          console.log(`dynamic action: [${dynamicActions.join(",")}]`);

        results.push(...staticActions);
        results.push(...dynamicActions);
      }
    }

    return results;
  }

  /**
   * Empty implementation as Config already IConfig,
   * so we can just return itself.
   *
   * @returns this object
   * @override
   *
   * @public
   */
  public build(): this {
    return this;
  }

  /**
   * Compare current config with other,
   * This function WILL NOT compare function.
   *
   * @param c - other config
   * @returns true if this config is equal to other config
   *
   * @beta
   */
  public compare(c: Config<string>): boolean {
    if (this._settings.size !== c._settings.size) return false;
    if (!isSameMap(this._settings, c._settings)) return false;

    if (this._config.size !== c._config.size) return false;
    if (
      !isSameMap(
        this._config,
        c._config,
        (a, b) => a.toString() === b.toString()
      )
    )
      return false;

    return true;
  }

  private async _resolveAction(
    actions: CommandType | undefined
  ): Promise<Array<string>> {
    if (this._isDebug) console.log(`resolve action: ${actions}`);
    if (!actions) return [];

    // Resolve to list of promise of list of string
    const promises = toArray(actions).map((action) =>
      toPromise(action).then(toArray)
    );

    // Resolve to promise of list of string
    return Promise.all(promises).then((v) => v.flatMap((v) => v));
  }
}

export type { Builder };
