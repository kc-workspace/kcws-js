jest.mock("@actions/core");

import { setOutput, setSecret } from "@actions/core";

import { OutputContextPlugin } from ".";
import { ContextBuilder } from "../../builder";

describe("contexts.plugins.outputs", () => {
  const plugin = new OutputContextPlugin();
  const context = ContextBuilder.empty().addPlugin(plugin).build();

  test("add plugin should usable with use()", () => {
    expect(context.has("output")).toEqual(true);
    expect(context.use("output")).toEqual(plugin);
    expect(context.use("output").name).toEqual("output");
  });

  test("markAsSecret", () => {
    context.use("output").markAsSecret("hello");
    expect(setSecret).toHaveBeenCalledWith("hello");
  });

  test("setOutput", () => {
    context.use("output").setOutput("hello", "value");
    expect(setOutput).toHaveBeenCalledWith("hello", "value");
  });
});
