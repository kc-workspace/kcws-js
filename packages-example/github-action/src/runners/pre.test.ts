import app, { context } from "../app";
import runner from "./pre";

describe("[pre-hook] application runner", () => {
  test("should print info logs", async () => {
    jest.spyOn(context.plugins.log, "info");

    await app.exec(runner);
    expect(context.plugins.log.info).toHaveBeenCalledTimes(1);
  });
});
