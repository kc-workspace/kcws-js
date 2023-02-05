export const isNumberEquals = (a: number, b: number): boolean => {
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  return a === b;
};
