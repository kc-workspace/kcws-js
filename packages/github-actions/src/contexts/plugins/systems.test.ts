jest.mock("@actions/core");

import { addPath, exportVariable } from "@actions/core";

import { ContextBuilder } from "../builder";
import { SystemContextPlugin } from "./systems";

describe("contexts.plugins.systems", () => {
  const outputs = new SystemContextPlugin();
  const context = ContextBuilder.fromInput().addPlugin(outputs).build();

  test("add plugin should usable with use()", () => {
    expect(context.use("system")).toEqual(outputs);
    expect(context.use("system").name).toEqual("system");
  });

  test("addPath", () => {
    context.use("system").addPath("/etc/mock/bin");

    expect(addPath).toHaveBeenCalledTimes(1);
    expect(addPath).toHaveBeenCalledWith("/etc/mock/bin");
  });

  test("addPaths", () => {
    context
      .use("system")
      .addPaths("/etc/mock1/bin", "/etc/mock2/bin", "/etc/mock3/bin");

    expect(addPath).toHaveBeenCalledTimes(3);
    expect(addPath).toHaveBeenNthCalledWith(1, "/etc/mock1/bin");
    expect(addPath).toHaveBeenNthCalledWith(2, "/etc/mock2/bin");
    expect(addPath).toHaveBeenNthCalledWith(3, "/etc/mock3/bin");
  });

  test("exportVariable", () => {
    context.use("system").setEnvVar("key", "value");
    expect(exportVariable).toHaveBeenCalledTimes(1);
    expect(exportVariable).toHaveBeenCalledWith("key", "value");
  });
});
