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
 * get window string
 * @returns window string
 * @alpha
 */
export const windowString = () => {
  // eslint-disable-next-line unicorn/prefer-global-this
  return window.toString();
};
