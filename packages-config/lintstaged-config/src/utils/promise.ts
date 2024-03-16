export const toPromise = <T>(s: T | Promise<T>): Promise<T> => {
  return Promise.resolve(s);
};
