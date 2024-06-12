import type { InputOptions } from "@actions/core";
import type { BaseContext, ContextPlugin } from "..";

import { toString, type BaseConverter } from "../../converters";
import { findInputs } from "../../utils/inputs";

/**
 * Context Plugin allows user to request input from action consumer
 * @public
 */
export class InputContextPlugin implements ContextPlugin<BaseContext, "input"> {
  readonly name = "input";
  readonly dependencies = [];

  private key = "";

  init(context: BaseContext) {
    this.key = context.name;
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
   * find input value from actions.yaml and environment
   *
   * @param name - input name
   * @param converter - string converter if output is not string
   * @returns output of input key
   */
  private get<Output>(
    name: string,
    converter: BaseConverter<string, Output>,
    options?: InputOptions
  ) {
    return findInputs(this.key, name, converter, options);
  }
}
