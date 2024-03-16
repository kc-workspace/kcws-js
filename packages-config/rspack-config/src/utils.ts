import { resolve } from "node:path";

/**
 * resolve relative path from input path.
 *
 * @param paths - input path
 * @returns absolute path from relative path
 */
export const relative = (input: string | string[]): string => {
  const paths = [input].flat();
  // rspack config was not support module yet.
  // eslint-disable-next-line unicorn/prefer-module
  return resolve(__dirname, ...paths);
};
