import { type CacheKeyOption, getRestoreCacheKeys, getSaveCacheKey } from ".";

describe("caches.utils", () => {
  describe("save caches", () => {
    test.each([
      [{} satisfies CacheKeyOption, /^action$/],
      [{ actionName: false } satisfies CacheKeyOption, ""],
      [{ custom: ["test"] } satisfies CacheKeyOption, /^action-test$/],
      [{ system: true } satisfies CacheKeyOption, /^action-\w+-\w+$/],
      [
        { system: { platform: false } } satisfies CacheKeyOption,
        /^action-\w+$/,
      ],
      [{ system: { arch: false } } satisfies CacheKeyOption, /^action-\w+$/],
      [{ system: { arch: true } } satisfies CacheKeyOption, /^action-\w+-\w+$/],
      [
        { system: { platform: true } } satisfies CacheKeyOption,
        /^action-\w+-\w+$/,
      ],
      [
        { system: { platform: true, arch: true } } satisfies CacheKeyOption,
        /^action-\w+-\w+$/,
      ],
    ])(
      "get save cache key from '%p' option should return '%s'",
      (option, expected) => {
        const key = getSaveCacheKey(option, "action");
        expect(key).toMatch(expected);
      }
    );
  });

  describe("restore caches", () => {
    test.each([
      [{} satisfies CacheKeyOption, []],
      [{ custom: ["example"] } satisfies CacheKeyOption, ["action-"]],
      [
        { custom: ["a", "b"] } satisfies CacheKeyOption,
        ["action-a-", "action-"],
      ],
    ])(
      "get restore cache key from '%p' option should return '%s'",
      (option, expected) => {
        const key = getRestoreCacheKeys(option, "action");
        expect(key).toEqual(expected);
      }
    );
  });
});
