import * as index from ".";

describe("index", () => {
  it.each([["regex"], ["eslint"], ["prettier"]])(
    "expose $1 function",
    (fn: string) => {
      const mapper = index as Record<string, unknown>;
      expect(mapper[fn]).not.toBeFalsy();
    }
  );

  it.each([["Action"], ["Unknown"]])("NOT expose $1 function", (fn: string) => {
    const mapper = index as Record<string, unknown>;
    expect(mapper[fn]).toBeFalsy();
  });
});
