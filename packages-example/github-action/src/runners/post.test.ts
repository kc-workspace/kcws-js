import app, { context } from "../app";
import runner from "./post";

describe("[post-hook] application runner", () => {
  test("should print info logs", async () => {
    jest.spyOn(context.plugins.log, "info");

    app.exec(runner);
    expect(context.plugins.log.info).toHaveBeenCalledTimes(1);
  });
});
