export type Type = string;

export type TMapFn<T> = (input: unknown) => T;

export type EqualFn<T> = (a: T, b: T) => boolean;

export enum EquivalentValue {
  EQUAL = 0,
  DIFF_TYPE = 1,
  DIFF_VALUE = 2,
}

export type Equivalent = (a: unknown, b: unknown) => EquivalentValue;
