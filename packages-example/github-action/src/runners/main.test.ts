jest.mock("@actions/core");

import { setFailed } from "@actions/core";

import builder from "../app";
import runner from "./main";

describe("application runner", () => {
  const app = builder.build();
  const context = app.context;

  test("should print info logs with default value", async () => {
    jest.spyOn(context.plugins.log, "info");
    jest
      .spyOn(context.plugins.input, "requiredString")
      .mockReturnValueOnce("hello");

    await app.run(runner);
    expect(setFailed).not.toHaveBeenCalled();
    expect(context.plugins.log.info).toHaveBeenCalledTimes(2);
  });

  test("should print info logs with custom value", async () => {
    jest.spyOn(context.plugins.log, "info");
    jest
      .spyOn(context.plugins.input, "requiredString")
      .mockReturnValueOnce("hello");

    await app.run(runner, { name: "name" });
    expect(setFailed).not.toHaveBeenCalled();
    expect(context.plugins.log.info).toHaveBeenCalledTimes(2);
  });
});
