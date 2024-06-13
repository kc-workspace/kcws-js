jest.mock("@actions/core");

import { setOutput } from "@actions/core";

import { ContextBuilder } from "../builder";
import { OutputContextPlugin } from "./outputs";

describe("contexts.plugins.outputs", () => {
  const outputs = new OutputContextPlugin();
  const context = ContextBuilder.fromInput().addPlugin(outputs).build();

  test("add plugin should usable with use()", () => {
    expect(context.use("output")).toEqual(outputs);
    expect(context.use("output").name).toEqual("output");
  });

  test("setOutput", () => {
    context.use("output").setOutput("hello", "value");
    expect(setOutput).toHaveBeenCalledWith("hello", "value");
  });
});
