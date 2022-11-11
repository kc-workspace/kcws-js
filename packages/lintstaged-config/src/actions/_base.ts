export interface IBaseActionOptions {
  files?: Array<string>;
}

export type BaseActionFn<O extends IBaseActionOptions> = (
  options?: O
) => string;
