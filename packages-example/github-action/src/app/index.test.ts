jest.mock("@actions/core");

import { setFailed } from "@actions/core";
import { mockRunner } from "@kcws/github-actions";

import builder from ".";

describe("app", () => {
  const app = builder.build();

  it("should fail when no required input", async () => {
    await app.run(mockRunner(app));

    expect(setFailed).toHaveBeenCalled();
    expect(setFailed).toHaveBeenCalledWith(
      new Error("Input required and not supplied: name")
    );
  });

  it("should executes runner", async () => {
    jest
      .spyOn(app.context.plugins.input, "requiredString")
      .mockReturnValueOnce("hello");

    const runner = mockRunner(app);
    await app.run(runner);
    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      { input: { name: "hello" } },
      app.context
    );
  });
});

describe("app.context", () => {
  const app = builder.build();
  it("should contains metadata", () => {
    const context = app.context;

    expect(context.name).toBe("@kcexamples/github-action");
    expect(context.version).toMatch(/\d.\d.\d/);
  });
});
