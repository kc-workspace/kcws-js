import { EquivalentValue, type Equivalent } from "./types";

export const isStringEquals: Equivalent = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string")
    return EquivalentValue.DIFF_TYPE;
  else if (a === b) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
