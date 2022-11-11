export type CommandType =
  | string
  | Array<string>
  | Promise<string | Array<string>>
  | Array<Promise<string | Array<string>>>;

/**
 * Function that we use to export from lint-staged config file
 */
export type ConfigFn = (filenames: Array<string>) => CommandType;
