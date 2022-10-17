/**
 * Function that we use to export from lint-staged config file
 */
export type ConfigFn = (
  filenames: Array<string>
) => string | Array<string> | Promise<string | Array<string>>;
