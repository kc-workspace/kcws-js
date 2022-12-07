/**
 * check input existing
 *
 * @param input - any input
 * @returns true if input is not Null
 *
 * @public
 */
export const isExist = <T = unknown>(input: Optional<T>): input is T => {
  return input !== undefined && input !== null;
};

/**
 * check input NOT existing
 *
 * @param input - any input
 * @returns true if input is Null
 *
 * @public
 */
export const isNotExist = <T = unknown>(input: Optional<T>): input is Null => {
  return input === undefined || input === null;
};
