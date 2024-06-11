const normalizeKey = (key: string) => {
  const emptySeparator = "";
  const nameSeparator = "_";
  const keySeparator = "__";

  let output = key;

  // When key is npm package name with scope (e.g. @example/name)
  if (output.includes("/")) output = output.slice(output.lastIndexOf("/") + 1);
  // Convert `-` to `_` for environment variable name
  if (output.includes("-")) output = output.replaceAll("-", nameSeparator);
  // Convert ` ` to `_` for environment variable name
  if (output.includes(" ")) output = output.replaceAll(" ", nameSeparator);
  // Convert `.` to `__` for environment variable name
  if (output.includes(".")) output = output.replaceAll(".", keySeparator);

  return output.replaceAll(/[!#$%&()*@[\]^{}]/g, emptySeparator).toUpperCase();
};

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
    .filter(v => typeof v === "string")
    .map((_, index, a) => a.slice(index).join("."))
    .map(v => normalizeKey(v!));
};

export const findEnvironment = (
  data: string[],
  defaults?: string,
  environments: Record<string, string | undefined | null> = process.env
): string | undefined => {
  const keys = buildKeys(...data);
  return getEnvironment(keys, environments) ?? defaults;
};

export const getEnvironment = (
  keys: string[],
  environments: Record<string, string | undefined | null> = process.env
) => {
  for (const key of keys) {
    const value = environments[key];
    if (typeof value === "string") return value;
  }
};
