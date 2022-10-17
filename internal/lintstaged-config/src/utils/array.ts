export const toArray = <T>(s: T | Array<T> | undefined): Array<T> => {
  if (Array.isArray(s)) return s;
  else if (s) return Array.of(s);
  else return [];
};
