import type {
  AppHooks,
  BaseApp,
  RunnerData,
  RunnerDataBuilder,
} from "./app.type";
import type { Builder, DataFromBuilder } from "../builders/builder.type";

import {
  ContextBuilder,
  type BaseContext,
  type ContextBuilderFromContext,
  type ContextMerged,
} from "../contexts";
import { deepMerge } from "../utils/objects";
import { App } from "./app";

/**
 * Actions app builder
 * @public
 */
export class AppBuilder<
  C extends BaseContext = BaseContext,
  I = NonNullable<unknown>,
  RAW_C extends BaseContext = BaseContext,
  RAW_I = NonNullable<unknown>,
> implements Builder<BaseApp<ContextMerged<C, RAW_C>, I & RAW_I>>
{
  /** default context if didn't set */
  static readonly defaultContext = ContextBuilder.empty().build();
  /** default data if didn't set */
  static readonly defaultData: RunnerData<NonNullable<unknown>> = { input: {} };

  /**
   * create app builder without any data
   *
   * @returns builder
   */
  static empty() {
    return new AppBuilder();
  }

  /**
   * create app builder from another builders
   *
   * @param contextBuilder - context builder
   * @param dataBuilder - data builder
   * @returns builder
   */
  static fromBuilders<CB extends ContextBuilder, NI>(
    contextBuilder: CB,
    dataBuilder: RunnerDataBuilder<DataFromBuilder<CB>, NI>
  ) {
    return new AppBuilder<DataFromBuilder<CB>, NI>(contextBuilder, dataBuilder);
  }

  /**
   * create app builder from context builder. Data should be default value ({@link AppBuilder.defaultData})
   * @param contextBuilder - context builder
   * @returns builder
   */
  static fromContextBuilder<CB extends ContextBuilder>(contextBuilder: CB) {
    return new AppBuilder<DataFromBuilder<CB>>(contextBuilder);
  }

  /**
   * create data builder from data builder. Context should be default value ({@link AppBuilder.defaultContext})
   * @param dataBuilder - data builder
   * @returns builder
   */
  static fromDataBuilder<NI>(dataBuilder: RunnerDataBuilder<BaseContext, NI>) {
    return new AppBuilder<BaseContext, NI>(undefined, dataBuilder);
  }

  private context: RAW_C | undefined;
  private contextBuilder: ContextBuilderFromContext<C> | undefined;

  private data: RunnerData<RAW_I> | undefined;
  private dataBuilder: RunnerDataBuilder<C, I> | undefined;

  private hooks: AppHooks<ContextMerged<C, RAW_C>, I & RAW_I>;
  private constructor(
    contextBuilder?: ContextBuilderFromContext<C>,
    dataBuilder?: RunnerDataBuilder<C, I>
  ) {
    this.contextBuilder = contextBuilder;
    this.dataBuilder = dataBuilder;
    this.hooks = {};
  }

  /**
   * set current builder with input data.
   *
   * The builder will overrides its builder, The data will overrides its data.
   * But the builder and data will merge together
   *
   * @param contextBuilder - context builder
   * @param dataBuilder - data builder
   * @returns builder
   */
  setContextBuilder<NC extends BaseContext, NI>(
    contextBuilder: ContextBuilderFromContext<NC>,
    dataBuilder: RunnerDataBuilder<NC, NI>
  ) {
    const output = this as unknown as AppBuilder<NC, NI, RAW_C, RAW_I>;
    output.contextBuilder = contextBuilder;
    output.dataBuilder = dataBuilder;
    return output;
  }

  /**
   * set current data builder with input value.
   *
   * The builder will overrides its builder, The data will overrides its data.
   * But the builder and data will merge together
   *
   * @param dataBuilder - data builder
   * @returns builder
   */
  setDataBuilder<NI>(dataBuilder: RunnerDataBuilder<C, NI>) {
    const output = this as unknown as AppBuilder<C, NI, RAW_C, RAW_I>;
    output.dataBuilder = dataBuilder;
    return output;
  }

  /**
   * set raw context value from input.
   *
   * The builder will overrides its builder, The data will overrides its data.
   * But the builder and data will merge together
   *
   * @param context - raw context
   * @returns builder
   */
  setContext<NC extends BaseContext>(context: NC) {
    const output = this as unknown as AppBuilder<C, I, NC, RAW_I>;
    output.context = context;
    return output;
  }

  /**
   * set raw data value from input.
   *
   * The builder will overrides its builder, The data will overrides its data.
   * But the builder and data will merge together
   *
   * @param data - raw data
   * @returns builder
   */
  setData<NI>(data: RunnerData<NI>) {
    const output = this as unknown as AppBuilder<C, I, RAW_C, NI>;
    output.data = data;
    return output;
  }

  /**
   * set hook function on hook name
   *
   * @param key - hook name
   * @param hook - hook function
   */
  setHook<K extends keyof AppHooks<ContextMerged<C, RAW_C>, I & RAW_I>>(
    key: K,
    hook: AppHooks<ContextMerged<C, RAW_C>, I & RAW_I>[K]
  ) {
    this.hooks[key] = hook;
    return this;
  }

  /**
   * set hooks function. This will merge with {@link AppBuilder.setHook} function
   *
   * @param hooks - hook functions
   */
  setHooks(hooks: AppHooks<ContextMerged<C, RAW_C>, I & RAW_I>) {
    this.hooks = deepMerge(hooks, this.hooks);
    return this;
  }

  /**
   * build Action app from current configuration.
   *
   * @returns Actions app
   */
  build() {
    let context: ContextMerged<C, RAW_C> | undefined;

    if (this.contextBuilder) context = this.contextBuilder.build();
    if (this.context) {
      context = context ? (context.merge(this.context) as C) : this.context;
    } else if (!context) {
      context = AppBuilder.defaultContext;
    }

    const dataBuilder: RunnerDataBuilder<
      ContextMerged<C, RAW_C>,
      I & RAW_I
    > = async ctx => {
      let data: RunnerData<I & RAW_I> | undefined;

      if (this.dataBuilder)
        data = (await this.dataBuilder(ctx as C)) as RunnerData<I & RAW_I>;
      if (this.data) {
        data = data
          ? deepMerge(data, this.data as RunnerData<I & RAW_I>)
          : (this.data as RunnerData<I & RAW_I>);
      } else if (!data) {
        data = AppBuilder.defaultData as RunnerData<I & RAW_I>;
      }

      return data;
    };

    return new App(context, dataBuilder, this.hooks);
  }
}
