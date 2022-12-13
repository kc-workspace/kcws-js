import Mixin from ".";

class Overrider {
  public a: number = 10;

  public fn(): number {
    return 999;
  }
}

class Jumpable {
  public jump(): string {
    return "jump";
  }
}

class Duckable {
  public duck(): string {
    return "duck";
  }
}

describe("Mixin", () => {
  test("able to extends Sprite function from jumpable class", () => {
    const mixin = Mixin.derive(
      class Sprite {
        public x: number = 1;
        public y: number = 2;
      }
    );

    const Sprite = mixin.apply(Jumpable).apply(Duckable).get();

    const sprite = new Sprite();
    expect(sprite.x).toEqual(1);
    expect(sprite.y).toEqual(2);

    expect(sprite.jump()).toEqual("jump");
    expect(sprite.duck()).toEqual("duck");
  });

  test("base property cannot be overridden by mixin", () => {
    const mixin = Mixin.derive(
      class Sprite {
        public a: number = 1;
        public b: number = 2;
      }
    );

    const Sprite = mixin.apply(Overrider).get();

    const sprite = new Sprite();
    expect(sprite.a).toEqual(1);
    expect(sprite.b).toEqual(2);
  });

  test("base function will be overridden by mixin", () => {
    const mixin = Mixin.derive(
      class Sprite {
        public fn(): string {
          return "test";
        }
      }
    );
    const Sprite = mixin.apply(Overrider).get();

    const sprite = new Sprite();
    expect(sprite.fn()).toEqual(999);
  });
});
