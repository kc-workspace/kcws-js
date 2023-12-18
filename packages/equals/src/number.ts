import { EquivalentValue, type Equivalent } from "./types";

export const isNumberEquals: Equivalent = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number")
    return EquivalentValue.DIFF_TYPE;
  else if (Number.isNaN(a) && Number.isNaN(b)) return EquivalentValue.EQUAL;
  else if (a === b) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
