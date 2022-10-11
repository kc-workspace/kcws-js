export type Action = (
  filenames: string[]
) => string | string[] | Promise<string | string[]>;
