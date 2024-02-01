import type { ISettings } from "./index.type";

import { EquivalentValue as EV } from "./constants";
import {
  isArrayEquals,
  isBigIntEquals,
  isBooleanEquals,
  isFunctionEquals,
} from ".";

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
    "Are '%p' and '%p' equals (%p)? %s",
    (a, b, setting, expected) => {
      expect(fn(a, b, setting)).toEqual(expected);
    }
  );
};

describe("Datatypes equals function", () => {
  createEqualFnTest(
    isArrayEquals,
    {
      a: [],
      b: [],
      output: EV.EQUAL,
    },
    {
      a: "hello",
      b: [],
      output: EV.DIFF_TYPE,
    },
    {
      a: [123],
      b: [321],
      output: EV.DIFF_VALUE,
    },
    {
      a: [1, 2, 3],
      b: [1, 2, 3],
      output: EV.EQUAL,
    },
    {
      a: [1],
      b: [1, 2],
      output: EV.DIFF_VALUE,
    },
    {
      a: [3, 2, 1],
      b: [1, 2, 3],
      output: EV.DIFF_VALUE,
    },
    {
      a: [3, 2, 1],
      b: [1, 2, 3],
      settings: { order: false },
      output: EV.EQUAL,
    }
  );
  createEqualFnTest(
    isBigIntEquals,
    {
      a: 1n,
      b: 1n,
      output: EV.EQUAL,
    },
    {
      a: BigInt("1000000000000"),
      b: 1_000_000_000_000n,
      output: EV.EQUAL,
    },
    {
      a: 5,
      b: 5n,
      output: EV.DIFF_TYPE,
    },
    {
      a: BigInt("5"),
      b: 6n,
      output: EV.DIFF_VALUE,
    }
  );
  createEqualFnTest(
    isBooleanEquals,
    {
      a: true,
      b: true,
      output: EV.EQUAL,
    },
    {
      a: 0,
      b: 1,
      output: EV.DIFF_TYPE,
    },
    {
      a: false,
      b: 1,
      output: EV.DIFF_TYPE,
    },
    {
      a: true,
      b: false,
      output: EV.DIFF_VALUE,
    }
  );
  createEqualFnTest(
    isFunctionEquals,
    {
      a: createEqualFnTest,
      b: createEqualFnTest,
      output: EV.EQUAL,
    },
    {
      a: () => {},
      b: undefined,
      output: EV.DIFF_TYPE,
    },
    {
      a: () => {},
      b: () => {},
      output: EV.DIFF_VALUE,
    }
  );
});
