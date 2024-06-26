import { ExampleContextPlugin } from ".";
import { ContextBuilder } from "../../builder";

describe("contexts.plugins.examples", () => {
  const plugin = new ExampleContextPlugin();
  const context = ContextBuilder.empty().addPlugin(plugin).build();

  test("add plugin should usable with use()", () => {
    expect(context.has("example")).toEqual(true);
    expect(context.use("example")).toEqual(plugin);
    expect(context.use("example").name).toEqual("example");
  });
});
