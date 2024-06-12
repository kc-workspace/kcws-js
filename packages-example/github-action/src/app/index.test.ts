import { ContextBuilder } from "@kcws/github-actions";

import app, { context } from ".";

describe("app", () => {
  it("should executes runner", async () => {
    const runner = jest.fn();
    await app.exec(runner);
    expect(runner).toHaveBeenCalledTimes(1);
  });
});

describe("app.context", () => {
  it("should contains metadata", () => {
    // By default package.json should not found on source code
    // because package.json is NOT on the same directory as source code
    expect(context.name).toBe("");
    expect(context.version).toBe("");

    ContextBuilder.fromContext(context);
  });

  it("should contains plugins", () => {
    expect(context.use("input")).not.toBeFalsy();
    expect(context.use("log")).not.toBeFalsy();
    expect(context.use("exec")).not.toBeFalsy();
  });
});
