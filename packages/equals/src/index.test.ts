import type { ISettings } from "./index.type";

import { EquivalentValue as EV } from "./constants";
import { isArrayEquals } from ".";

type Data<O, A, B = A> = {
  a: A;
  b: B;
  output: O;
  settings?: ISettings;
};
const createEqualFnTest = <O, A, B = A>(
  fn: (a: A, b: B, setting?: ISettings) => O,
  ...data: Data<O, A, B>[]
) => {
  it.each(data.map(v => [v.a, v.b, v.settings, v.output]))(
    "Are '%p' and '%p' equals (%p)? %t",
    (a, b, setting, expected) => {
      expect(fn(a, b, setting)).toEqual(expected);
    }
  );
};

describe("Datatypes equals function", () => {
  createEqualFnTest(isArrayEquals, {
    a: [],
    b: [],
    output: EV.EQUAL,
  });
});
