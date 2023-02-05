export type Type = string;

export type TMapFn<T> = (input: unknown) => T;

export type EqualFn<T> = (a: T, b: T) => boolean;
