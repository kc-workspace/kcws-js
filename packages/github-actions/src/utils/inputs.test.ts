jest.mock("@actions/core");

import { getInput } from "@actions/core";

import { asMock, mockEnvironment } from "./mocker";
import { findInputs, parseInputs } from "./inputs";
import { toString } from "../converters";

describe("utils.inputs.finder", () => {
  test("impossible case: getInput return null", () => {
    asMock(getInput).mockReturnValueOnce(undefined as unknown as string);
    mockEnvironment({}, () => {
      const input = findInputs("", "test", toString);
      expect(input).toBeUndefined();
    });
  });

  test("if inputs is missing", () => {
    asMock(getInput).mockReturnValueOnce("");
    mockEnvironment({}, () => {
      const input = findInputs("", "test", toString);
      expect(input).toBeUndefined();
    });
  });

  test("if found inputs on env", () => {
    asMock(getInput).mockReturnValueOnce("");
    mockEnvironment({ TEST: "hello" }, () => {
      const input = findInputs("", "test", toString);
      expect(input).toEqual("hello");
    });
  });

  test("if found inputs on input", () => {
    asMock(getInput).mockImplementationOnce(name => {
      switch (name) {
        case "test":
          return "hello";
        default:
          return "";
      }
    });

    mockEnvironment({}, () => {
      const input = findInputs("", "test", toString);
      expect(input).toEqual("hello");
    });
  });
});

describe("utils.inputs.parser", () => {
  test("if missing inputs data", () => {
    mockEnvironment({}, () => {
      const output = parseInputs("key", "name", "", toString);
      expect(output).toBeUndefined();
    });
  });

  test("if found inputs from input", () => {
    mockEnvironment({}, () => {
      const output = parseInputs("key", "name", "hello", toString);
      expect(output).toEqual("hello");
    });
  });

  test("if found inputs from environment", () => {
    const environment = {
      KEY__NAME: "defaults",
    };

    mockEnvironment(environment, () => {
      const output = parseInputs("key", "name", "", toString);
      expect(output).toEqual("defaults");
    });
  });

  test("if found both, use environment instead", () => {
    const environment = {
      KEY__NAME: "example",
    };

    mockEnvironment(environment, () => {
      const output = parseInputs("key", "name", "defaults", toString);
      expect(output).toEqual("example");
    });
  });
});
