jest.mock("@actions/cache");

import { saveCache, restoreCache } from "@actions/cache";

import { ContextBuilder } from "..";
import { CacheContextPlugin } from ".";
import { CacheKeyOption } from "./caches.type";

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

  describe("getSaveKey", () => {
    const caches = context.use("cache");
    test.each([
      [{} satisfies CacheKeyOption, /^name$/],
      [{ actionName: false } satisfies CacheKeyOption, ""],
      [{ custom: ["test"] } satisfies CacheKeyOption, /^name-test$/],
      [{ system: true } satisfies CacheKeyOption, /^name-\w+-\w+$/],
      [{ system: { platform: false } } satisfies CacheKeyOption, /^name-\w+$/],
      [{ system: { arch: false } } satisfies CacheKeyOption, /^name-\w+$/],
      [{ system: { arch: true } } satisfies CacheKeyOption, /^name-\w+-\w+$/],
      [
        { system: { platform: true } } satisfies CacheKeyOption,
        /^name-\w+-\w+$/,
      ],
      [
        { system: { platform: true, arch: true } } satisfies CacheKeyOption,
        /^name-\w+-\w+$/,
      ],
    ])(
      "get save cache key from '%p' option should return '%s'",
      (option, expected) => {
        const key = caches.getSaveKey(option);
        expect(key).toMatch(expected);
      }
    );
  });

  describe("getRestoreKeys", () => {
    const caches = context.use("cache");
    test.each([
      [{} satisfies CacheKeyOption, []],
      [{ custom: ["example"] } satisfies CacheKeyOption, ["name-"]],
      [{ custom: ["a", "b"] } satisfies CacheKeyOption, ["name-a-", "name-"]],
    ])(
      "get restore cache key from '%p' option should return '%s'",
      (option, expected) => {
        const key = caches.getRestoreKeys(option);
        expect(key).toEqual(expected);
      }
    );
  });
});
