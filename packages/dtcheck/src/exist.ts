/**
 * check input existing
 *
 * @param t - any input
 * @returns true if input is not Null
 *
 * @public
 */
export const isExist = <T = unknown>(t: Optional<T>): t is T => {
  return t !== undefined && t !== null;
};

/**
 * check input NOT existing
 *
 * @param t - any input
 * @returns true if input is Null
 *
 * @public
 */
export const isNotExist = <T = unknown>(t: Optional<T>): t is Null => {
  return t === undefined || t === null;
};
