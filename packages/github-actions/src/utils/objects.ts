const deepMerge = <A extends object>(a: A, b?: Partial<A> | null): A => {
  if (b === undefined || b === null || Object.keys(b).length <= 0)
    return Object.assign({}, a) as A;

  const result: Record<string, unknown> = {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const aValue = (a as Record<string, unknown>)[key];
    const bValue = (b as Record<string, unknown>)[key];
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      result[key] = [...(aValue as unknown[]), ...(bValue as unknown[])];
    } else if (
      typeof bValue === "object" &&
      !Object.getOwnPropertyNames(Object.getPrototypeOf(bValue)).includes(
        "hasOwnProperty"
      )
    ) {
      result[key] = bValue;
    } else if (
      typeof aValue === "object" &&
      aValue !== null &&
      typeof bValue === "object" &&
      bValue !== null
    ) {
      result[key] = deepMerge(
        aValue as Record<string, unknown>,
        bValue as Record<string, unknown>
      );
    } else {
      result[key] = structuredClone(bValue ?? aValue);
    }
  }

  return result as A;
};

export { deepMerge };
