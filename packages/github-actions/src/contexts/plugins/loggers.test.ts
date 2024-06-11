jest.mock("@actions/core");

import { debug, error, info, notice, warning } from "@actions/core";

import { asMock } from "../../utils/mocker";
import { ContextBuilder } from "..";
import { LogContextPlugin } from ".";

describe("contexts.plugins.loggers", () => {
  const log = new LogContextPlugin();
  const context = ContextBuilder.builder().addPlugin(log).build();

  test("add plugin should usable with use()", () => {
    expect(context.use("log")).toEqual(log);
    expect(context.use("log").name).toEqual("log");
  });

  test.each([
    ["", [""], ""],
    ["hello world", [""], "hello world"],
    ["hello {0}", ["world"], "hello world"],
    ["{0} {1}", ["hello", "world"], "hello world"],
    ["{0} {1}", [["hello", "world"]], "hello world"],
    ["{0} {1}", ["{1}", "world"], "world world"],
    ["{0} {1}", ["hello", "{0}"], "hello {0}"],
    ["{0} {0} {1}", ["hello", "world"], "hello hello world"],
    ["{0} {2} {1}", [false, 99, "world"], "false world 99"],
    ["{key} {value}", [{ key: "hello", value: "world" }], "hello world"],
    ["{key} {key} {value}", [{ key: "1", value: "world" }], "1 1 world"],
    ["{0} {1} {2}", [[1, 2, 3]] as any, "1 2 3"],
  ])("format(%s, %p) should returns %s", (format, data, expected) => {
    expect(context.use("log").format(format, ...data)).toEqual(expected);
  });

  test("print debug logs", () => {
    asMock(debug).mockReturnValueOnce();
    context.use("log").debug("hello {name}", { name: "world" });

    expect(debug).toHaveBeenCalledTimes(1);
    expect(debug).toHaveBeenCalledWith("hello world");
  });

  test("print info logs", () => {
    asMock(info).mockReturnValueOnce();
    context.use("log").info("hello {0}", "world");

    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith("hello world");
  });

  test("print warn logs", () => {
    const error_ = new Error("hello world");
    asMock(warning).mockReturnValueOnce();
    context.use("log").warn(error_);

    expect(warning).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalledWith(error_, undefined);
  });

  test("print error logs", () => {
    const error_ = new Error("hello world");
    asMock(error).mockReturnValueOnce();
    context.use("log").error(error_);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(error_, undefined);
  });

  test("print notice logs", () => {
    const error_ = new Error("hello world");
    asMock(notice).mockReturnValueOnce();
    context.use("log").notice(error_);

    expect(notice).toHaveBeenCalledTimes(1);
    expect(notice).toHaveBeenCalledWith(error_, undefined);
  });
});
