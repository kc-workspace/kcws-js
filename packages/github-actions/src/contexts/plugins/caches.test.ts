jest.mock("@actions/cache");

import { saveCache, restoreCache } from "@actions/cache";

import { ContextBuilder } from "..";
import { CacheContextPlugin } from ".";

describe("contexts.plugins.caches", () => {
  const plugin = new CacheContextPlugin();
  const context = ContextBuilder.fromInput("name").addPlugin(plugin).build();

  test("add plugin should usable with use()", () => {
    expect(context.use("cache")).toEqual(plugin);
    expect(context.use("cache").name).toEqual("cache");
  });

  test("save cache using actions/core apis", async () => {
    await context
      .use("cache")
      .save({ actionName: true }, "/tmp/hello", "/tmp/world");

    expect(saveCache).toHaveBeenCalledTimes(1);
    expect(saveCache).toHaveBeenCalledWith(
      ["/tmp/hello", "/tmp/world"],
      "name"
    );
  });

  test("restore cache using actions/core apis", async () => {
    await context
      .use("cache")
      .restore(
        { actionName: true, custom: ["hello", "world"] },
        "/tmp/hello",
        "/tmp/world"
      );

    expect(restoreCache).toHaveBeenCalledTimes(1);
    expect(restoreCache).toHaveBeenCalledWith(
      ["/tmp/hello", "/tmp/world"],
      "name-hello-world",
      ["name-hello-", "name-"]
    );
  });
});
