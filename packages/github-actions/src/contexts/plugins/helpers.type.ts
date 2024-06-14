import type { BaseContext } from "../builder.type";

/**
 * Runner for {@link HelperContextPlugin.group}
 * @public
 */
export type GroupRunner<CONTEXT extends BaseContext, OUT> = (
  context: CONTEXT
) => OUT | Promise<OUT>;
