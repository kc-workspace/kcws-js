import { ContextBuilder } from ".";

describe("index", () => {
  test("create context via builder", () => {
    expect(ContextBuilder.empty()).toBeTruthy();
  });
});
