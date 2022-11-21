export const toArray = <T>(s: T | Array<T> | undefined): Array<T> => {
  if (Array.isArray(s)) return s;
  else if (s) return Array.of(s);
  else return [];
};

export const isSameArray = (
  arr1: Array<unknown>,
  arr2: Array<unknown>
): boolean => {
  return arr1.length === arr2.length && !arr1.some((v) => !arr2.includes(v));
};
