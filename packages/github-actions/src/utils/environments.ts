/**
 * Build keys combinations.
 *
 * @param data key array
 * @returns keys
 * @example
 *    buildKeys(["example", "name"]) => ["EXAMPLE__NAME", "NAME"]
 */
const buildKeys = (...data: (string | undefined | null)[]) => {
  return data
    .filter(v => (v?.length ?? 0) > 0)
    .map(v => v?.replace("-", "_")?.replace(" ", "_")?.toUpperCase())
    .map((_, index, a) => a.slice(index).join("."))
    .map(v => v.replace(".", "__"));
};

export const findEnvironment = (
  data: string[],
  defaults?: string,
  environment: Record<string, string | undefined | null> = process.env
): string | undefined => {
  const keys = buildKeys(...data);
  for (const key of keys) {
    const value = environment[key];
    if (value !== undefined && value !== null) {
      return value;
    }
  }

  return defaults;
};
