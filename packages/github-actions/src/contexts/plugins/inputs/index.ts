import type { EnvContextPlugin } from "../..";
import type { IInputContext, IInputContextPlugin } from "./index.type";

import { getInput, type InputOptions } from "@actions/core";

import { convert, toString, type BaseConverter } from "../../../converters";

/**
 * Context Plugin allows user to request input from action consumer
 * @public
 */
export class InputContextPlugin implements IInputContextPlugin {
  readonly name = "input" as const;
  readonly dependencies = ["env"] as const;

  private env: EnvContextPlugin | undefined;
  private key = "";

  init(context: IInputContext) {
    this.key = context.name;
    this.env = context.use("env");
  }

  requiredString(name: string) {
    return this.required(name, toString);
  }

  required<Output>(
    name: string,
    converter: BaseConverter<string, Output>
  ): Output {
    const value = this.get(name, converter);
    if (value === undefined || value === null) {
      throw new Error(`Input required and not supplied: ${name}`);
    }

    return value;
  }

  optionalString(name: string) {
    return this.optional(name, toString);
  }

  optional<Output>(name: string, converter: BaseConverter<string, Output>) {
    return this.get(name, converter);
  }

  /**
   * find data from both yaml `with` argument (input) and environment variables.
   * The environment variables, we search for both with context.name and without
   *
   * @param name - Data name
   * @param converter - Datatype converter
   * @param options - Input data options
   * @returns Input data or undefined if not exist
   *
   * @public
   */
  private get<Output>(
    name: string,
    converter: BaseConverter<string, Output>,
    options?: InputOptions
  ) {
    const inputData = getInput(name, {
      required: false,
      trimWhitespace: true,
      ...options,
    });

    return this.getEnvData(name, inputData, converter);
  }

  /**
   * find data from environment variables or use `defaults` value.
   * If no data has been found, return `undefined`
   *
   * @param name - Data name
   * @param defaults - Default data value
   * @param converter - Datatype converter
   * @returns data or undefined
   *
   * @internal
   */
  private getEnvData<Output>(
    name: string,
    defaults: string | undefined | null,
    converter: BaseConverter<string, Output>
  ): Output | undefined {
    const environment = this.env?.getCombination([this.key, name]);
    const input = environment ?? defaults ?? "";
    return input === "" ? undefined : convert(input, converter);
  }
}
