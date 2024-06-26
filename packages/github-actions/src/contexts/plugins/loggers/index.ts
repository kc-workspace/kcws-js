import type {
  GroupRunner,
  ILogContext,
  ILogContextPlugin,
  LogData,
  PrimitiveType,
} from "./index.type";

import {
  debug,
  error,
  group,
  info,
  notice,
  setFailed,
  warning,
  type AnnotationProperties,
} from "@actions/core";

/**
 * Context Plugin allows user to logs their data
 * @public
 */
export class LogContextPlugin implements ILogContextPlugin {
  static readonly defaultUnknownVersion = "unknown-version";
  static readonly defaultUnknownName = "unknown-app";
  static readonly defaultUnknownInfo = "Action info missing";

  readonly name = "log" as const;
  readonly dependencies = [] as const;

  private verbose: boolean;
  private context: ILogContext | undefined;
  constructor(verbose: boolean = false) {
    this.verbose = verbose;
  }

  init(context: ILogContext) {
    const isInitiated = this.context !== undefined;
    this.context = context;

    if (!isInitiated) {
      if (this.verbose) this.info(this.getActionInfo());
      else this.debug(this.getActionInfo());
    }
  }

  /**
   * group the function output together in collapsible log message
   *
   * @param name - group name
   * @param runner - group runner function
   * @returns runner result (if any)
   */
  group<OUT>(
    name: string,
    runner: GroupRunner<ILogContext, OUT>
  ): Promise<OUT> {
    return group(name, async () => {
      return await runner(this.context!);
    });
  }

  /**
   * Log notice data.
   *
   * @param data - logging data
   * @param properties - additional data properties
   */
  notice(data: string | Error, properties?: AnnotationProperties) {
    notice(data, properties);
  }

  /**
   * Log error data.
   *
   * @param data - logging data
   * @param properties - additional data properties
   */
  error(data: string | Error, properties?: AnnotationProperties) {
    error(data, properties);
  }

  /**
   * Log warning data.
   *
   * @param data - logging data
   * @param properties - additional data properties
   */
  warn(data: string | Error, properties?: AnnotationProperties) {
    warning(data, properties);
  }

  /**
   * Log info message.
   * Check {@link LogContextPlugin.format} for formatting syntax.
   *
   * @param format - format message
   * @param data - message data
   * @see {@link LogContextPlugin.format}
   */
  info(format: string, ...data: LogData) {
    info(this.format(format, ...data));
  }

  /**
   * Log debug message.
   * Check {@link LogContextPlugin.format} for formatting syntax.
   *
   * @param format - format message
   * @param data - message data
   * @see {@link LogContextPlugin.format}
   */
  debug(format: string, ...data: LogData) {
    debug(this.format(format, ...data));
  }

  /**
   * throw error and exit action with code 1
   * @param error - fatal error
   */
  throw(error: Error) {
    setFailed(error);
  }

  /**
   * Formatting string. This support 2 types of input data:
   *   - Input object: it will use key to match (e.g. format('hello \{key\}', \{'key': 'world'\})),
   *   - Input primitive: it will use index to match (e.g. format('hello \{0\}'), 'world')
   *
   * @param format - format message
   * @param data - message data
   */
  format(format: string, ...data: LogData): string {
    let output = format;
    if (data.length > 0) {
      const t = typeof data[0];

      if (
        t === "string" ||
        t === "number" ||
        t === "boolean" ||
        t === "undefined"
      ) {
        const array = data as PrimitiveType[];
        for (const [index, element] of array.entries()) {
          output = output.replaceAll(
            // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
            new RegExp(`\\{${index}\\}`, "gi"),
            (element ?? "<undefined>").toString()
          );
        }

        return output;
      } else {
        const record = data[0] as Record<string, PrimitiveType>;
        for (const key in record) {
          const value = record[key];
          output = output.replaceAll(
            // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
            new RegExp(`\\{${key}\\}`, "gi"),
            (value ?? "<undefined>").toString()
          );
        }
      }
    }

    return output;
  }

  /**
   * get action information string
   */
  private getActionInfo() {
    const appName = this.context?.name;
    const hasAppName = typeof appName === "string" && appName.length > 0;
    const appVersion = this.context?.version;
    const hasAppVersion =
      typeof appVersion === "string" && appVersion.length > 0;

    if (hasAppName && hasAppVersion) {
      return `${appName}: ${appVersion}`;
    } else if (hasAppName) {
      return `${appName}: ${LogContextPlugin.defaultUnknownVersion}`;
    } else if (hasAppVersion) {
      return `${LogContextPlugin.defaultUnknownName}: ${appVersion}`;
    } else {
      return LogContextPlugin.defaultUnknownInfo;
    }
  }
}
