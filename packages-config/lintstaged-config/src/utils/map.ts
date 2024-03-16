export const isSameMap = <K, V>(
  map1: Map<K, V>,
  map2: Map<K, V>,
  compareFn: (a: V, b: V) => boolean = (a, b) => a === b
): boolean => {
  return (
    map1.size === map2.size &&
    ![...map1.entries()].some(([key, value]) => {
      return !map2.has(key) || !compareFn(map2.get(key)!, value);
    })
  );
};
