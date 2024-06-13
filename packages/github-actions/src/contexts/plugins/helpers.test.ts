import { ContextBuilder } from "../builder";
import { HelperContextPlugin } from "./helpers";
import { LogContextPlugin } from "./loggers";

describe("contexts.plugins.helpers", () => {
  const helpers = new HelperContextPlugin();
  const context = ContextBuilder.fromInput()
    .addPlugin(new LogContextPlugin())
    .addPlugin(helpers)
    .build();

  test("add plugin should usable with use()", () => {
    expect(context.use("helper")).toEqual(helpers);
    expect(context.use("helper").name).toEqual("helper");
  });

  describe("getActionInfo", () => {
    test.each([
      [ContextBuilder.empty(), HelperContextPlugin.defaultInfoMissingErr],
      [ContextBuilder.fromInput("name", ""), "name: unknown version"],
      [ContextBuilder.fromInput("", "v1.1.1"), "unknown app: v1.1.1"],
      [ContextBuilder.fromInput("hello", "v1.2.3"), "hello: v1.2.3"],
    ])("from context '%p' should returns %s", (builder, expected) => {
      const context = builder
        .addPlugin(new LogContextPlugin())
        .addPlugin(new HelperContextPlugin())
        .build();
      expect(context.use("helper").getActionInfo()).toEqual(expected);
    });
  });
});
