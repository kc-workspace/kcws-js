import { toPromise } from "./promise";

describe("promise utilities", () => {
  it("undefined input", () => {
    return expect(toPromise(undefined)).resolves.toEqual(undefined);
  });

  it("array input", () => {
    return expect(toPromise(["test", "hello"])).resolves.toEqual([
      "test",
      "hello",
    ]);
  });

  it("error promise", () => {
    const error = new Error("hello world");
    return expect(
      toPromise(new Promise<string>((resolve, reject) => reject(error)))
    ).rejects.toEqual(error);
  });
});
