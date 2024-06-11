import type { ContextPlugin } from "..";
import type { PrimitiveType } from "../builder.type";

import {
  type AnnotationProperties,
  debug,
  error,
  info,
  notice,
  warning,
} from "@actions/core";

export type LogData = (Record<string, PrimitiveType> | PrimitiveType)[];

/**
 * Context Plugin allows user to create logs output to actions console
 * @public
 */
export class LogContextPlugin implements ContextPlugin<"log"> {
  readonly name = "log";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}

  /**
   * Log notice message.
   * Check {@link LogContextPlugin.format} for formatting syntax.
   *
   * @param format - format message
   * @param data - message data
   * @see {@link LogContextPlugin.format}
   */
  notice(message: string | Error, properties?: AnnotationProperties) {
    notice(message, properties);
  }

  /**
   * Log error message.
   * Check {@link LogContextPlugin.format} for formatting syntax.
   *
   * @param format - format message
   * @param data - message data
   * @see {@link LogContextPlugin.format}
   */
  error(message: string | Error, properties?: AnnotationProperties) {
    error(message, properties);
  }

  /**
   * Log warning message.
   * Check {@link LogContextPlugin.format} for formatting syntax.
   *
   * @param format - format message
   * @param data - message data
   * @see {@link LogContextPlugin.format}
   */
  warn(message: string | Error, properties?: AnnotationProperties) {
    warning(message, properties);
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

      if (t === "string" || t === "number" || t === "boolean") {
        const array = data as PrimitiveType[];
        for (const [index, element] of array.entries()) {
          output = output.replaceAll(
            // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
            new RegExp(`\\{${index}\\}`, "gi"),
            element.toString()
          );
        }

        return output;
      } else {
        const arguments_ = data[0] as Record<string, PrimitiveType>;
        for (const key in arguments_) {
          const value = arguments_[key];
          output = output.replaceAll(
            // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
            new RegExp(`\\{${key}\\}`, "gi"),
            value.toString()
          );
        }
      }
    }

    return output;
  }
}
