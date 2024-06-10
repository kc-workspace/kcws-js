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

  notice(message: string | Error, properties?: AnnotationProperties) {
    notice(message, properties);
  }

  error(message: string | Error, properties?: AnnotationProperties) {
    error(message, properties);
  }

  warn(message: string | Error, properties?: AnnotationProperties) {
    warning(message, properties);
  }

  info(format: string, ...data: LogData) {
    info(this.format(format, ...data));
  }

  debug(format: string, ...data: LogData) {
    debug(this.format(format, ...data));
  }

  /**
   * formatting string. The formatting should be 'hello \{world\}'
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
