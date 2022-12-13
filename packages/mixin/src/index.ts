/**
 * constructor function
 *
 * @public
 */
export type Constructor<C> = new (...args: Array<unknown>) => C;

/**
 * mixin object to apply mixin to input object
 *
 * @beta
 */
class Mixin<BC> {
  /**
   * derive mixin object using input base constructor.
   *
   * @remarks
   *
   * This function contains side-effect to input constructor,
   * be-aware that your input will be applied to mixin without copied first.
   *
   * @param ctor - base contructor to apply mixin
   * @returns mixin deriver object to apply more mixins
   *
   * @beta
   */
  public static derive<C>(ctor: Constructor<C>): Mixin<C> {
    return new Mixin(ctor);
  }

  private _baseCtor: Constructor<BC>;

  private constructor(ctor: Constructor<BC>) {
    this._baseCtor = ctor;
  }

  /**
   * apply mixins base constuctor to extends function
   *
   * @param ctor - extra object that should extends to base class
   *
   * @see https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
   *
   * @beta
   */
  public apply<C>(ctor: Constructor<C>): Mixin<BC & C> {
    Object.getOwnPropertyNames(ctor.prototype).forEach((name) => {
      const property =
        Object.getOwnPropertyDescriptor(ctor.prototype, name) ??
        Object.create(null);

      Object.defineProperty(this._baseCtor.prototype, name, property);
    });

    return this as Mixin<BC & C>;
  }

  /**
   * get constructor of object applied mixin
   *
   * @returns constructor to initiate derive class
   *
   * @beta
   */
  public get(): Constructor<BC> {
    return this._baseCtor;
  }
}

export default Mixin;
