import { Envvars, IEnvContextPlugin } from "./index.type";

/**
 * Context Plugin allows user to query environment variables
 * @public
 */
export class EnvContextPlugin implements IEnvContextPlugin {
  readonly name = "env" as const;
  readonly dependencies = [] as const;

  private environments: Envvars | undefined;
  constructor() {
    this.environments;
  }

  init() {}

  /**
   * set environments for searching data
   *
   * @param environments - all environment variables record
   */
  setEnvironments(environments: Envvars): this {
    this.environments = environments;
    return this;
  }

  /**
   * get data from combination of input keys (with optional environments)
   *
   * @example
   * ```
   * getCombination(["a", "b"]) => ["A__B", "B"]
   * ```
   *
   * @param keys - variable keys
   * @param environments - optional environments for searching data
   */
  getCombination(keys: string[], defaults?: string, environments?: Envvars) {
    const combinationKeys = this.buildCombinationKeys(keys);
    return this.lookup(combinationKeys, environments) ?? defaults;
  }

  /**
   * lookup and return first existed variable; otherwise return undefined
   *
   * @param keys - variable names
   * @param environments - optional environments for searching data
   */
  lookup(keys: string[], environments?: Envvars) {
    const env = environments ?? this.environments ?? process.env;
    for (const key of keys) {
      const value = env[key];
      if (typeof value === "string") return value;
    }
  }

  /**
   * Build combination keys.
   *
   * @param keys - variable keys
   * @returns combination keys
   */
  private buildCombinationKeys(keys: Array<string | undefined | null>) {
    return keys
      .filter(v => typeof v === "string")
      .map((_, index, a) => a.slice(index).join("."))
      .map(v => this.normalizeKey(v!));
  }

  private normalizeKey(key: string) {
    const emptySeparator = "";
    const nameSeparator = "_";
    const keySeparator = "__";

    let output = key;

    // Remove npm scope from key (e.g. @example/name => name)
    if (output.includes("/"))
      output = output.slice(output.lastIndexOf("/") + 1);
    // Convert `-` to `_` for environment variable name
    if (output.includes("-")) output = output.replaceAll("-", nameSeparator);
    // Convert ` ` to `_` for environment variable name
    if (output.includes(" ")) output = output.replaceAll(" ", nameSeparator);
    // Convert `.` to `__` for environment variable name
    if (output.includes(".")) output = output.replaceAll(".", keySeparator);

    return output
      .replaceAll(/[!#$%&()*@[\]^{}]/g, emptySeparator)
      .toUpperCase();
  }
}
