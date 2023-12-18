import { EquivalentValue, type Equivalent } from "./types";

export const isBigIntEquals: Equivalent = (a, b) => {
  if (typeof a !== "bigint" || typeof b !== "bigint")
    return EquivalentValue.DIFF_TYPE;
  else if (a === b) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
