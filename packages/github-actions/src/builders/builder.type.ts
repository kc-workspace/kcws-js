export interface Builder<V> {
  build(): V;
}

export type DataFromBuilder<B extends Builder<unknown>> = ReturnType<
  B["build"]
>;
