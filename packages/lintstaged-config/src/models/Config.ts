import type { CommandType, ConfigFn } from "./ConfigFn";

import { toArray } from "../utils/array";
import { toPromise } from "../utils/promise";

import { prettier, eslint, shellcheck, yamllint } from "../actions";

/**
 * All possible values contains in configuration mapper.
 *
 * @internal
 */
export interface IConfigValue {
  /**
   * Regular Expression for matching staged files
   *
   * @remarks
   * This values will be passed to
   * {@link https://github.com/micromatch/micromatch | micromatch} to apply.
   */
  regexs: Array<string>;
  /**
   * Action after staged file matched with regex values.
   *
   * @remarks
   * This values will execute as static command
   * without any matched files name,
   * if you would like to include staged file in the command.
   * Please use {@link IConfigValue.actionFn} instead.
   * You can specify both values.
   */
  actions: CommandType;

  /**
   * Function execute with matched regex values.
   *
   * @remarks
   * This function will include staged files matched with provide regex,
   * if you would like to run simple command(s).
   * Please use {@link IConfigValue.actions} instead.
   * You can specify both values.
   */
  actionFn: ConfigFn;
}

/**
 * Default possible key
 */
export type DefaultKey = "jsts" | "json" | "sh" | "yaml";

/**
 * Config builder create by {@link Config.builder} function.
 *
 * @public
 */
class Builder<K extends string> {
  private _result: Map<string, IConfigValue>;
  private _settings: Map<string, string>;

  public constructor() {
    this._result = new Map();
    this._settings = new Map();
  }

  public default(): Builder<DefaultKey> {
    const builder = new Builder<DefaultKey>();
    return builder
      .set("jsts", {
        regexs: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        actionFn: (files) => [
          eslint({ files, fix: true, maxWarnings: 0 }),
          prettier({ fix: true, files }),
        ],
      })
      .set("json", {
        regexs: ["**/*.json"],
        actionFn: (files) => prettier({ fix: true, files }),
      })
      .set("sh", {
        regexs: ["**/*.sh", "**/*.bash", "**/*.zsh"],
        actionFn: (files) => shellcheck({ files }),
      })
      .set("yaml", {
        regexs: ["**/*.yaml", "**/*.yml"],
        actionFn: (files) => yamllint({ files }),
      });
  }

  public debugMode(): Builder<K> {
    this._settings.set("debug", "true");
    return this;
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
  public append(
    key: K,
    value: Partial<Exclude<IConfigValue, "actionFn">>
  ): Builder<K> {
    if (this._result.has(key)) {
      const cached = this._result.get(key) as IConfigValue;
      return this.set(key, this._mergeValue(cached, value));
    } else {
      return this.set(key, value);
    }
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
 * Condition to getCommand from config
 *
 * @beta
 */
export type ConfigCondition = (regex: Array<string>) => Array<string>;

/**
 * Configuration object to generate list of command
 * needed for specify values on {@link ConfigCondition}
 *
 * @public
 */
export class Config<K extends string> {
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
   * @beta
   */
  public get length(): number {
    return this._config.size;
  }

  /**
   * is debug mode enabled?
   */
  private get _isDebug(): boolean {
    return (
      this._settings.has("debug") && this._settings.get("debug") === "true"
    );
  }

  /**
   * create config builder with empty value
   *
   * @returns config builder
   *
   * @public
   */
  public static builder<K extends string = "">(): Builder<K> {
    return new Builder<K>();
  }

  /**
   * select series of command needed to execute on input condition
   *
   * @remarks
   * we will select all static and dynamic actions from
   * any config group that regex return non-empty array.
   * and execute action to get command and merge them together.
   *
   * @param cond - condition to select specify config values
   * @returns commands to execute on terminal
   *
   * @beta
   */
  public async getCommands(cond: ConfigCondition): Promise<Array<string>> {
    const results: Array<string> = [];
    for await (const [key, value] of this._config.entries()) {
      if (this._isDebug) console.log(`verifying ${key}...`);

      const files = cond(value.regexs);
      if (files.length > 0) {
        if (this._isDebug)
          console.log(`found matched files [${files.join(",")}]`);

        // Resolve static actions
        const staticActions = await this._resolveAction(value.actions);
        if (this._isDebug) console.log(`static action: [${staticActions.join(",")}]`);

        // Resolve dynamic actions
        const dynamicActions = await this._resolveAction(value.actionFn?.(files));
        if (this._isDebug)
          console.log(`dynamic action: [${dynamicActions.join(",")}]`);

        results.push(...staticActions);
        results.push(...dynamicActions);
      }
    }

    return results;
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
