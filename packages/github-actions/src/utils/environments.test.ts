import { mockEnvironment } from "./mocker";
import { findEnvironment } from "./environments";

describe("utils.environments.finder", () => {
  const u = undefined as unknown as string;
  test.each([
    [["hello world"], { HELLO_WORLD: "message" }, "message"],
    [["first-name"], { FIRST_NAME: "name" }, "name"],
    [["last.name"], { LAST__NAME: "last" }, "last"],
    [[""], { HELLO: "world" }, undefined],
    [["name"], { HELLO: "world" }, undefined],
    [["hello", "name"], { HELLO__NAME: "world" }, "world"],
    [["hello", "name"], { NAME: "world" }, "world"],
    [["hello", "name"], { HELLO__NAME: "first", NAME: "second" }, "first"],
    [["", "name"], { NAME: "john" }, "john"],
    [[u, "name"], { NAME: "john" }, "john"],
  ])(
    "find environment of '%p' from '%p' should return %s",
    (name, object, expected) => {
      mockEnvironment(object, () => {
        const output = findEnvironment(name);
        expect(output).toEqual(expected);
      });
    }
  );

  test("find environment with defaults value", () => {
    const environment = {
      NAME: "john",
    };
    mockEnvironment(environment, () => {
      const output = findEnvironment(["invalid"], "example");
      expect(output).toEqual("example");
    });
  });
});
