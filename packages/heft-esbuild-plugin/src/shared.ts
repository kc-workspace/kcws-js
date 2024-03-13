/**
 * Plugin name.
 *
 * @public
 */
export const PLUGIN_NAME = "esbuild-plugin" as const;

/**
 * The error message when user enabled watch mode.
 *
 * @internal
 */
export const UNSUPPORTED_WATCH_MODE =
  `Esbuild is only available when running without watch mode.` as const;
