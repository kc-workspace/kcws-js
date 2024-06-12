jest.mock("@actions/core");

import { info } from "@actions/core";

import app from "../app";
import runner from "./pre";

describe("[pre-hook] application runner", () => {
  test("should print info logs", async () => {
    app.exec(runner);
    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith("hello pre world");
  });
});
