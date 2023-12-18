import { EquivalentValue, type Equivalent } from "./types";

export const isSymbolEquals: Equivalent = (a, b) => {
  if (typeof a !== "symbol" || typeof b !== "symbol")
    return EquivalentValue.DIFF_TYPE;
  else if (a.toString() === b.toString()) return EquivalentValue.EQUAL;
  else return EquivalentValue.DIFF_VALUE;
};
