import { join } from "node:path";

import { Name } from "./constants";

/**
 * say hello
 *
 * @param name - input name
 * @returns hello message
 *
 * @alpha
 */
export const hello = (name: string = Name): string => {
  return `hello ${name}`;
};

/**
 * join input path together
 * @param paths - input path string
 * @returns joined path
 *
 * @alpha
 */
export const joinPath = (...paths: string[]) => {
  return join(...paths);
};
