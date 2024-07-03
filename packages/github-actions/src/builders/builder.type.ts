/**
 * All builder class should implement from this interface
 * @public
 */
export interface Builder<V> {
  build(): V;
}

/**
 * A type helper for get type of building data from builder object
 * @public
 */
export type DataFromBuilder<B extends Builder<unknown>> = ReturnType<
  B["build"]
>;
