declare global {
  type WithNull<T> = T | null;
  type WithUndefined<T> = T | undefined;
  type Null = undefined | null;

  type Optional<T> = T | undefined | null;
  type Nullable<T> = Optional<T>; // alias
}

export {};
