import app, { context } from "../app";
import runner from "./main";

describe("application runner", () => {
  test("should print info logs with default value", async () => {
    jest.spyOn(context.plugins.log, "info");

    await app.exec(runner);
    expect(context.plugins.log.info).toHaveBeenCalledTimes(2);
  });

  test("should print info logs with custom value", async () => {
    jest.spyOn(context.plugins.log, "info");

    await app.exec(runner, { name: "name" });
    expect(context.plugins.log.info).toHaveBeenCalledTimes(2);
  });
});
