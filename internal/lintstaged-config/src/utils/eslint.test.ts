import type { Action } from "../models/Action";
import { eslint } from "./eslint";

const action = (act: Action, ...filenames: string[]): ReturnType<Action> => {
  return act(filenames);
};

describe("eslint()", () => {
  it("default eslint command", () => {
    expect(action(eslint())).toEqual("eslint --fix --max-warnings 0");
  });

  it("custom eslint command with fix=false", () => {
    expect(action(eslint({ fix: false }))).toEqual("eslint --max-warnings 0");
  });

  it("custom eslint command with maxWarnings=-1", () => {
    expect(action(eslint({ maxWarnings: -1 }))).toEqual("eslint --fix");
  });

  it("custom eslint command with maxWarnings=1", () => {
    expect(action(eslint({ maxWarnings: 1 }))).toEqual(
      "eslint --fix --max-warnings 1"
    );
  });

  it("custom eslint command with fix=false maxWarnings=-1", () => {
    expect(action(eslint({ fix: false, maxWarnings: -1 }))).toEqual("eslint");
  });
});
