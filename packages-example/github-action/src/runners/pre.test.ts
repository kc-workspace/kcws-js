jest.mock("@actions/core");

import { setFailed } from "@actions/core";

import builder from "../app";
import runner from "./pre";

describe("[pre-hook] application runner", () => {
  const app = builder.build();
  const context = app.context;

  test("should print info logs", async () => {
    jest.spyOn(context.plugins.log, "info");
    jest
      .spyOn(context.plugins.input, "requiredString")
      .mockReturnValueOnce("hello");

    await app.run(runner);
    expect(setFailed).not.toHaveBeenCalled();
    expect(context.plugins.log.info).toHaveBeenCalledTimes(1);
  });
});
