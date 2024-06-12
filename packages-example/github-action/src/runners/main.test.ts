jest.mock("@actions/core");

import { info } from "@actions/core";

import app from "../app";
import runner from "./main";

describe("application runner", () => {
  test("should print info logs with default value", async () => {
    await app.exec(runner);

    expect(info).toHaveBeenCalled();
    expect(info).toHaveBeenLastCalledWith("hello world");
  });

  test("should print info logs with custom value", async () => {
    await app.exec(runner, { name: "name" });

    expect(info).toHaveBeenCalled();
    expect(info).toHaveBeenLastCalledWith("hello name");
  });
});
