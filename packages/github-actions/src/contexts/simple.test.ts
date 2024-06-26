import { MethodNotImplemented } from "../errors";
import { SimpleContext } from "./simple";

describe("contexts.simple", () => {
  const context = new SimpleContext("example", "v0.1.1");

  test("create simple context", () => {
    expect(context.name).toEqual("example");
    expect(context.version).toEqual("v0.1.1");
    expect(context.plugins).toEqual({});
  });

  test("never has plugins", () => {
    expect(context.has("abc")).toEqual(false);
  });

  test("throw error when call merge() function", () => {
    expect(() => context.merge(context)).toThrow(
      new MethodNotImplemented("SimpleContext.merge()")
    );
  });

  test("throw error when call use() function", () => {
    expect(() => context.use("hello")).toThrow(
      new MethodNotImplemented("SimpleContext.use()")
    );
  });
});
