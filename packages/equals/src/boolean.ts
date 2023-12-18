import { EquivalentValue, type Equivalent } from "./types";

export const isBooleanEquals: Equivalent = (a, b) => {
  if (typeof a !== "boolean" || typeof b !== "boolean")
    return EquivalentValue.DIFF_TYPE;
  else if (a === b) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
