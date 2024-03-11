import { PACKAGE_NAME } from "./constants";

/**
 * say hello
 *
 * @param name - input name
 * @returns hello message
 *
 * @alpha
 */
export const hello = (name: string = PACKAGE_NAME): string => {
  return `hello ${name}`;
};
