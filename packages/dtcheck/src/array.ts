/**
 * check input is array or not.
 *
 * @param input - any input
 * @returns true if input is array; otherwise, return false
 *
 * @public
 */
export const isArray = <T>(input: Optional<unknown>): input is Array<T> => {
  return Array.isArray(input);
};
