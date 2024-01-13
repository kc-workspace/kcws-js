import type { Configuration } from "@rspack/core";
import type { ConfigTransformers } from "./service";

import { ConfigWrapper } from "./wrapper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TransformerParams<T extends (...args: any) => any> =
  Parameters<T> extends [unknown, ...infer R] ? R : never;

/**
 * @beta
 */
export class ConfigBuilder<Transformers extends ConfigTransformers> {
  private wrapper: ConfigWrapper;
  private transformers: Transformers;
  constructor(config: Configuration, transformers: Transformers) {
    this.wrapper = new ConfigWrapper(config);
    this.transformers = transformers;
  }

  set(config: Configuration): this {
    this.wrapper = this.wrapper.set(config);
    return this;
  }

  add(config: Configuration): this {
    this.wrapper.merge(config);
    return this;
  }

  use<Name extends keyof Transformers>(
    name: Name,
    ...params: TransformerParams<Transformers[Name]>
  ): this {
    this.wrapper = this.transformers[name](this.wrapper, ...params);
    return this;
  }

  build(): Configuration {
    return this.wrapper.config;
  }
}
