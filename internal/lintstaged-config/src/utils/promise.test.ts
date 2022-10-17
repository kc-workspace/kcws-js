import { toPromise } from "./promise";

describe("promise utilities", () => {
  it("wrap undefined to promise", () => {
    return expect(toPromise(undefined)).resolves.toEqual(undefined);
  });

  it("wrap array to promise", () => {
    return expect(toPromise(["test", "hello"])).resolves.toEqual([
      "test",
      "hello",
    ]);
  });

  it("wrap array to promise", () => {
    const err = new Error("hello world");
    return expect(
      toPromise(new Promise<string>((resolve, reject) => reject(err)))
    ).rejects.toEqual(err);
  });
});
