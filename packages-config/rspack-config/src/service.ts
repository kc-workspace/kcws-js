import type { Configuration } from "@rspack/core";

import { ConfigBuilder } from ".";
import { ConfigWrapper } from "./wrapper";

/**
 * @public
 */
export type ConfigTransformer<Params extends unknown[] = unknown[]> = (
  input: ConfigWrapper,
  ...params: Params
) => ConfigWrapper;

/**
 * @public
 */
export type ConfigTransformers = Record<string, ConfigTransformer>;

type Merge<BaseObject, Key extends string, Value> = BaseObject & {
  [name in Key]: Value;
};

/**
 * @public
 */
export class ConfigService<Transformers extends ConfigTransformers> {
  static define<
    Name extends string,
    Params extends unknown[],
    Transformer extends ConfigTransformer<Params> = ConfigTransformer<Params>,
  >(name: Name, transformer: Transformer) {
    const service = new ConfigService<NonNullable<unknown>>();
    return service.define<Name, Params, Transformer>(name, transformer);
  }

  static builder(config?: Configuration) {
    const service = new ConfigService<NonNullable<unknown>>();
    return service.builder(config);
  }

  private readonly transformers: ConfigTransformers;
  private constructor() {
    this.transformers = {};
  }

  define<
    Name extends string,
    Params extends unknown[],
    Transformer extends ConfigTransformer<Params> = ConfigTransformer<Params>,
  >(
    name: Name,
    transformer: Transformer
  ): ConfigService<Merge<Transformers, Name, Transformer>> {
    this.transformers[name] = transformer as unknown as ConfigTransformer;
    return this as unknown as ConfigService<
      Merge<Transformers, Name, Transformer>
    >;
  }

  builder(config?: Configuration): ConfigBuilder<Transformers> {
    return new ConfigBuilder(config ?? {}, this.transformers as Transformers);
  }
}
