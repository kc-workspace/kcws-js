jest.mock("@actions/core");

import { getInput } from "@actions/core";

import { ContextBuilder } from "..";
import { InputContextPlugin } from ".";
import { toBool, toString } from "../../converters";
import { asMock, mockEnvironment } from "../../utils/mocker";

describe("contexts.plugins.inputs", () => {
  const inputs = new InputContextPlugin();
  const context = ContextBuilder.builder().addPlugin(inputs).build();

  test("add plugin should usable with use()", () => {
    expect(context.use("input")).toEqual(inputs);
    expect(context.use("input").name).toEqual("input");
  });

  test("cannot found input on optional()", () => {
    asMock(getInput).mockReturnValueOnce("");

    const environment = {};
    mockEnvironment(environment, () => {
      expect(context.use("input").optionalString("name")).toBeUndefined();
    });
  });

  test("cannot found input on required()", () => {
    asMock(getInput).mockReturnValueOnce("");

    const environment = {};
    mockEnvironment(environment, () => {
      expect(() => context.use("input").required("flag", toBool)).toThrow(
        "Input required and not supplied: flag"
      );
    });
  });

  test("found input from getInput", () => {
    asMock(getInput).mockReturnValueOnce("hello");

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
      expect(context.use("input").optional("name", toString)).toEqual(
        "hello world"
      );
    });
  });
});
