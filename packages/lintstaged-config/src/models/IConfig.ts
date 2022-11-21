/**
 * All possible command type on lintstaged configuration.
 *
 * @public
 */
export type CommandType =
  | string
  | Array<string>
  | Promise<string | Array<string>>
  | Array<Promise<string | Array<string>>>;

/**
 * Function that we use to export from lint-staged config file
 *
 * @public
 */
export type ConfigFn = (filenames: Array<string>) => CommandType;

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
 * A configuration builder for lintstaged.
 *
 * @beta
 */
export interface IConfigBuilder {
  build(): IConfig;
}

/**
 * A lintstaged configuration
 *
 * @beta
 */
export interface IConfig {
  getCommands(condition: ConfigCondition): Promise<Array<string>>;
}

/**
 * Condition to getCommand from config
 *
 * @beta
 */
export type ConfigCondition = (regex: Array<string>) => Array<string>;
