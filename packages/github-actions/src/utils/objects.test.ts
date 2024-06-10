import { deepMerge } from "./objects";

class A {
  constructor(readonly keys: string[]) {}
  key(): string {
    return this.keys.join(",");
  }
}

describe("utils.objects.merger", () => {
  test.each([
    [{}, {}, {}],
    [{ a: "a" }, { b: "b" }, { a: "a", b: "b" }],
    [{ a: "a" }, { a: "b" }, { a: "b" }],
    [
      { a: { aa: { aaa: "a" }, bb: "bb" } },
      { a: { aa: { aaa: "b", bbb: "bbb" } } },
      { a: { aa: { aaa: "b", bbb: "bbb" }, bb: "bb" } },
    ],
    [{ a: ["a", "aa"] }, { a: ["a", "bb"] }, { a: ["a", "aa", "a", "bb"] }],
  ])("deepMerge(%p, %p) returns %p", (a, b, expected) => {
    const result = deepMerge(a, b);
    expect(result).toEqual(expected);
  });

  test("deepMerge class return replace instead of merge keys", () => {
    const result = deepMerge(
      { a: new A(["a", "b", "c"]) },
      { a: new A(["d"]) }
    );
    expect(result.a.keys).toEqual(["d"]);
    expect(result.a.key()).toEqual("d");
  });
});
