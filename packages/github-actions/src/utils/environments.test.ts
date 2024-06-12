import { mockEnvironment } from "../tests/mocker";
// eslint-disable-next-line import/no-namespace
import * as env from "./environments";

describe("utils.environments.finder", () => {
  const u = undefined as unknown as string;
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
      jest.spyOn(env, "getEnvironment");

      env.findEnvironment(input);
      expect(env.getEnvironment).toHaveBeenCalledWith(
        expected,
        expect.any(Object)
      );
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
        const output = env.findEnvironment(keys);
        expect(output).toEqual(expected);
      });
    }
  );

  test("find environment with multiple key", () => {
    const environment = {
      HELLO_WORLD: "john",
    };
    mockEnvironment(environment, () => {
      const output = env.findEnvironment(["hello world"]);
      expect(output).toEqual("john");
    });
  });

  test("find environment with defaults value", () => {
    const environment = {
      NAME: "john",
    };
    mockEnvironment(environment, () => {
      const output = env.findEnvironment(["invalid"], "example");
      expect(output).toEqual("example");
    });
  });
});
