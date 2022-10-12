import type { Action } from "../models/Action";
import { prettier } from "./prettier";

const action = (act: Action, ...filenames: string[]): ReturnType<Action> => {
  return act(filenames);
};

describe("prettier()", () => {
  it("default prettier command", () => {
    expect(action(prettier())).toEqual("prettier --write");
  });

  it("custom prettier command with fix=false", () => {
    expect(action(prettier({ fix: false }))).toEqual("prettier");
  });
});
