## API Report File for "@kcws/lintstaged-config"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type BaseActionFn<O extends IBaseActionOptions> = (options?: O) => string;

// @public
export class Builder<K extends string> implements IConfigBuilder {
    constructor();
    append<EK extends string>(key: EK, value: Partial<Exclude<IConfigValue, "actionFn">>): Builder<K | EK>;
    build(): Config<K>;
    debugMode(): this;
    // Warning: (ae-incompatible-release-tags) The symbol "default" is marked as @public, but its signature references "CustomDefaultConfig" which is marked as @beta
    default(custom?: CustomDefaultConfig): Builder<K | DefaultKey>;
    delete<EK extends K>(key: EK): Builder<Exclude<K, EK>>;
    set<EK extends string>(key: EK, value: Partial<IConfigValue>): Builder<K | EK>;
}

// @public
export type CommandType = string | Array<string> | Promise<string | Array<string>> | Array<Promise<string | Array<string>>>;

// @public
export class Config<K extends string> implements IConfigBuilder, IConfig {
    constructor(config: Map<K, IConfigValue>, settings: Map<string, string>);
    // @override
    build(): this;
    static builder<K extends string = "">(): Builder<K>;
    // @beta
    compare(c: Config<string>): boolean;
    static default(): Builder<DefaultKey>;
    // @override
    getCommands(condition: ConfigCondition): Promise<Array<string>>;
    get length(): number;
}

// @public
export type ConfigCondition = (
key: string,
regex: Array<string>) => Array<string>;

// @public
export type ConfigFn = (filenames: Array<string>) => CommandType;

// @beta
export interface CustomDefaultConfig {
    eslint?: OnlyAppOptions<IEslintOptions> | false;
    jsonPrettier?: OnlyAppOptions<IPrettierOptions> | false;
    jstsPrettier?: OnlyAppOptions<IPrettierOptions> | false;
    shellcheck?: OnlyAppOptions<IShellcheckOptions> | false;
    yamllint?: OnlyAppOptions<IYamllintOptions> | false;
}

// @beta
export const DEFAULT_YAMLLINT_CONFIGS: string[];

// @public
export type DefaultKey = "jsts" | "json" | "sh" | "yaml";

// @beta
function defineConfig(builder: IConfigBuilder): ConfigFn;
export default defineConfig;

// @beta
export const eslint: BaseActionFn<IEslintOptions>;

// @beta
export const generic: (cmd: string, ...args: Array<string>) => string;

// @public
export interface IBaseActionOptions {
    files?: Array<string>;
}

// @public
export interface IConfig {
    getCommands(condition: ConfigCondition): Promise<Array<string>>;
}

// @public
export interface IConfigBuilder {
    build(): IConfig;
}

// @public
export interface IConfigValue {
    actionFn: ConfigFn;
    actions: CommandType;
    regexs: Array<string>;
}

// @beta
export interface IEslintOptions extends IBaseActionOptions {
    // (undocumented)
    fix?: boolean;
    // (undocumented)
    maxWarnings?: number;
}

// @beta
export interface IPrettierOptions extends IBaseActionOptions {
    // (undocumented)
    fix?: boolean;
}

// @beta
export interface IShellcheckOptions extends IBaseActionOptions {
}

// @beta
export interface IYamllintOptions extends IBaseActionOptions {
    config?: string;
    strict?: boolean;
}

// @beta
export type OnlyAppOptions<T> = Pick<T, Exclude<keyof T, keyof IBaseActionOptions>>;

// @beta
export const prettier: BaseActionFn<IPrettierOptions>;

// @beta
export const rush: (cmd: string, ...args: Array<string>) => ConfigFn;

// @beta
export const rushOn: (pkg: string | undefined, cmd: string, ...args: Array<string>) => string;

// @beta
export const shellcheck: BaseActionFn<IShellcheckOptions>;

// @internal
export type _WalkCallback = (directory: string) => string | undefined;

// @beta
export const yamllint: BaseActionFn<IYamllintOptions>;

```
