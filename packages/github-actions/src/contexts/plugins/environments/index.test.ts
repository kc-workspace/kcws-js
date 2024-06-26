import { EnvContextPlugin } from ".";
import { ContextBuilder } from "../../builder";
import { mockEnvironment } from "../../../mocks";

// eslint-disable-next-line jest/valid-title
describe("contexts.plugins.environments", () => {
  const plugin = new EnvContextPlugin();
  const context = ContextBuilder.empty().addPlugin(plugin).build();
  const u = undefined as unknown as string;

  test("add plugin should usable with use()", () => {
    expect(context.has("env")).toEqual(true);
    expect(context.use("env")).toEqual(plugin);
    expect(context.use("env").name).toEqual("env");
  });

  test.each([
    [["key"], ["KEY"]],
    [["a$b"], ["AB"]],
    [["a#^&*()b"], ["AB"]],
    [["hello world"], ["HELLO_WORLD"]],
    [["first-name"], ["FIRST_NAME"]],
    [["a-b-c-d"], ["A_B_C_D"]],
    [["last.name"], ["LAST__NAME"]],
    [["a.b.c.d"], ["A__B__C__D"]],
    [
      ["a", "b", "c"],
      ["A__B__C", "B__C", "C"],
    ],
    [
      ["example", "name"],
      ["EXAMPLE__NAME", "NAME"],
    ],
    [["@example/package"], ["PACKAGE"]],
    [["@example/package/hello"], ["HELLO"]],
    [["@example/action.name"], ["ACTION__NAME"]],
    // If you use fromPackageJson() builder,
    // this will be your environment variable name
    [
      ["@github/actions.example", "name"],
      ["ACTIONS__EXAMPLE__NAME", "NAME"],
    ],
  ])(
    "when find environment of '%p' will check for '%p' keys",
    (input, expected) => {
      jest.spyOn(plugin, "lookup");

      plugin.getCombination(input);
      expect(plugin.lookup).toHaveBeenCalledWith(expected, undefined);
    }
  );

  test.each([
    [["name"], { NAME: "john" }, "john"],
    [["first-name"], { FIRST_NAME: "john" }, "john"],
    [["last.name"], { LAST__NAME: "smite" }, "smite"],
    [[""], { NAME: "smite" }, undefined],
    [["name"], { HELLO: "world" }, undefined],
    [["", "name"], { NAME: "john" }, "john"],
    [[u, "name"], { NAME: "john" }, "john"],
  ])(
    "find environment key '%p' from '%p' should returns '%p'",
    (keys, environments, expected) => {
      mockEnvironment(environments, () => {
        const output = plugin.setEnvironments(process.env).getCombination(keys);
        expect(output).toEqual(expected);
      });
    }
  );

  test("find environment with multiple key", () => {
    const environment = {
      HELLO_WORLD: "john",
    };
    mockEnvironment(environment, () => {
      const output = plugin
        .setEnvironments(process.env)
        .getCombination(["hello world"]);
      expect(output).toEqual("john");
    });
  });

  test("find environment with defaults value", () => {
    const environment = {
      NAME: "john",
    };
    const output = plugin.getCombination(["invalid"], "example", environment);
    expect(output).toEqual("example");
  });
});
