jest.mock("@actions/core");

import { info } from "@actions/core";

import app from "../app";
import runner from "./post";

describe("[post-hook] application runner", () => {
  test("should print info logs", async () => {
    app.exec(runner);
    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith("hello post world");
  });
});
