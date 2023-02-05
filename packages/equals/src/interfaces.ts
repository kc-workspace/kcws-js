import type { TMapFn, EqualFn, Type } from "./types";

export interface ISettings {
  order: boolean;
  typeMapping: TMapFn<Type>;
  typeEquivalent: Record<string, EqualFn<unknown>>;
}
