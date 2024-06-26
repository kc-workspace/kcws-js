import type { BaseContext } from "../context.type";

/**
 * A plugin interface for BaseContext
 * @public
 */
export interface ContextPlugin<
  NAME extends string,
  CTX extends BaseContext = BaseContext,
  DEPS extends unknown[] = ToDependencies<CTX>,
> {
  /** Plugin name */
  name: Readonly<NAME>;
  /** Plugin dependencies */
  dependencies: Readonly<DEPS>;
  /** Initiate plugin. It should automatically initiate from Context */
  init(context: CTX): void;
}

/**
 * A collection of plugins in DefaultContext class
 * @public
 */
export type Plugins<
  CTX extends BaseContext = BaseContext,
  DEPS extends string[] = [],
> = Record<string, ContextPlugin<string, CTX, DEPS>>;

type ToPluginObject<T> =
  T extends ContextPlugin<
    string,
    BaseContext<Plugins<BaseContext, string[]>>,
    string[]
  >
    ? {
        [KEY in T["name"]]: T;
      }
    : never;

/**
 * Convert plugin array to plugin object. Useful when you implement plugins that
 * depends on another plugins.
 *
 * @example
 * Example how to use this for create context with dependencies
 * ```
 * ToPluginsObject<[ExampleContextPluginA, ExampleContextPluginB]>
 * ```
 *
 * Real world example: Your ExampleContextPlugin depends on LogContextPlugin
 * ```
 * export type IExampleContext = BaseContext<ToPluginsObject<[LogContextPlugin]>>;
 * ```
 * @public
 */
export type ToPluginsObject<T> = T extends [infer FIRST, ...infer TAIL]
  ? ToPluginObject<FIRST> &
      (TAIL extends ContextPlugin<
        string,
        BaseContext<Plugins<BaseContext, string[]>>,
        string[]
      >[]
        ? ToPluginsObject<TAIL>
        : unknown)
  : unknown;

/**
 * Convert context object to dependencies array.
 * You can use this to convert BaseContext object to dependencies array list.
 *
 * @public
 */
export type ToDependencies<C extends BaseContext> =
  keyof C["plugins"] extends never
    ? never[]
    : ObjectKeyToArray<keyof C["plugins"]>;

// ----------------------- Type utilities ----------------------- //

// Reference https://github.com/microsoft/TypeScript/issues/13298#issuecomment-675386981
type TuplePrepend<Tuple extends readonly unknown[], NewElement> = [
  NewElement,
  ...Tuple,
];

type Consumer<Value> = (value: Value) => void;

type IntersectionFromUnion<Union> =
  (Union extends unknown ? Consumer<Union> : never) extends Consumer<
    infer ResultIntersection
  >
    ? ResultIntersection
    : never;

type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<
  Union extends unknown ? Consumer<Union> : never
>;

type UnionLast<Union> =
  OverloadedConsumerFromUnion<Union> extends (a: infer A) => void ? A : never;

type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;

type ObjectKeyToArray<
  RemainingUnion,
  CurrentTuple extends readonly unknown[] = [],
> = [RemainingUnion] extends [never]
  ? CurrentTuple
  : ObjectKeyToArray<
      UnionExcludingLast<RemainingUnion>,
      TuplePrepend<CurrentTuple, UnionLast<RemainingUnion>>
    >;
