jest.mock("@actions/core");

import { getInput } from "@actions/core";

import { InputContextPlugin } from ".";
import { EnvContextPlugin, ContextBuilder } from "../..";
import { toBool, toString } from "../../../converters";
import { mockEnvironment } from "../../../mocks";

describe("contexts.plugins.inputs", () => {
  const plugin = new InputContextPlugin();
  const context = ContextBuilder.empty()
    .addPlugin(new EnvContextPlugin())
    .addPlugin(plugin)
    .build();

  test("add plugin should usable with use()", () => {
    expect(context.has("input")).toEqual(true);
    expect(context.use("input")).toEqual(plugin);
    expect(context.use("input").name).toEqual("input");
  });

  test("cannot found input on optional()", () => {
    mocked(getInput).mockReturnValueOnce("");

    const environment = {};
    mockEnvironment(environment, () => {
      expect(context.use("input").optionalString("name")).toBeUndefined();
    });
  });

  test("cannot found input on required()", () => {
    mocked(getInput).mockReturnValueOnce("");

    const environment = {};
    mockEnvironment(environment, () => {
      expect(() => context.use("input").required("flag", toBool)).toThrow(
        "Input required and not supplied: flag"
      );
    });
  });

  test("found input from getInput", () => {
    mocked(getInput).mockReturnValueOnce("hello");

    const environment = {};
    mockEnvironment(environment, () => {
      expect(context.use("input").requiredString("name")).toEqual("hello");
    });
  });

  test("found input from environment", () => {
    const environment = {
      NAME: "hello world",
    };
    mockEnvironment(environment, () => {
      context.use("env").setEnvironments(process.env);
      expect(context.use("input").optional("name", toString)).toEqual(
        "hello world"
      );
    });
  });
});
