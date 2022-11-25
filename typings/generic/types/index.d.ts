declare global {
  type WithNull<T> = T | null;
  type WithUndefined<T> = T | undefined;
  type Null = undefined | null;

  type Optional<T> = T | undefined | null;
  type Nullable<T> = Optional<T>; // alias

  /**
   * Same as Required, for only K keys.
   * Anyelse, will be partial.
   *
   * @beta
   */
  type RequiredK<T, K extends keyof T = keyof T> = Required<
    Pick<T, Extract<keyof T, K>>
  > &
    Partial<Omit<T, K>>;

  /**
   * Same as Partial, for only K keys.
   * Anyelse, will be required.
   *
   * @beta
   */
  type PartialK<T, K extends keyof T = keyof T> = Partial<
    Pick<T, Extract<keyof T, K>>
  > &
    Required<Omit<T, K>>;
}

export {};
