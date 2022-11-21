/**
 * Base action options, every action option should implement this type.
 *
 * @public
 */
export interface IBaseActionOptions {
  /**
   * list of files changed
   * @readonly
   */
  files?: Array<string>;
}

/**
 * Action type, every action should implement this type.
 *
 * @public
 */
export type BaseActionFn<O extends IBaseActionOptions> = (
  options?: O
) => string;
