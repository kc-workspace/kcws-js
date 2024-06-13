jest.mock("@actions/exec");
jest.mock("@actions/core");

import { exec } from "@actions/exec";

import { mockEnvironment } from "../../tests/mocker";
import { ContextBuilder } from "..";
import { ExecContextPlugin, InputContextPlugin, LogContextPlugin } from ".";

describe("contexts.plugins.executors", () => {
  const plugin = new ExecContextPlugin();
  const context = ContextBuilder.fromInput()
    .addPlugin(new InputContextPlugin())
    .addPlugin(new LogContextPlugin())
    .addPlugin(plugin)
    .build();

  test("add plugin should usable with use()", () => {
    expect(context.use("exec")).toEqual(plugin);
    expect(context.use("exec").name).toEqual("exec");
  });

  test("run some command", async () => {
    await context.use("exec").run("ls", "-la");

    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec).toHaveBeenCalledWith("ls", ["-la"], undefined);
  });

  test("run some command with options", async () => {
    await context.use("exec").withOptions({ cwd: "/tmp" }).run("ls", "-la");
    await context.use("exec").run("ls", "-la");

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenNthCalledWith(1, "ls", ["-la"], { cwd: "/tmp" });
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(exec).toHaveBeenNthCalledWith(2, "ls", ["-la"], undefined);
  });

  test("rerun some command with same options", async () => {
    await context.use("exec").withOptions({ cwd: "/tmp" }).rerun("ls", "-la");
    await context.use("exec").rerun("ls", "-la");

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenNthCalledWith(1, "ls", ["-la"], { cwd: "/tmp" });
    expect(exec).toHaveBeenNthCalledWith(2, "ls", ["-la"], { cwd: "/tmp" });
  });

  describe("CapturedResult", () => {
    test("captureRun() should get stdout", async () => {
      mocked(exec).mockImplementation((cmd, args, options) => {
        options?.listeners?.stdout?.(Buffer.from("completed", "utf8"));
        return Promise.resolve(0);
      });

      const { code, stdout, stderr } = await context
        .use("exec")
        .captureRun("echo", "hello");

      expect(code).toEqual(0);
      expect(stdout?.toString()).toEqual("completed");
      expect(stderr).toEqual(undefined);
    });

    test("captureRun() should get stderr", async () => {
      mocked(exec).mockImplementation((cmd, args, options) => {
        options?.listeners?.stderr?.(Buffer.from("failure", "utf8"));
        return Promise.resolve(99);
      });

      const { code, stdout, stderr } = await context
        .use("exec")
        .captureRun("echo", "hello");

      expect(code).toEqual(99);
      expect(stdout).toEqual(undefined);
      expect(stderr?.toString()).toEqual("failure");
    });
  });

  test("dry-run some command", async () => {
    const environment = {
      DRYRUN: "true",
    };

    await mockEnvironment(environment, async () => {
      const ctx = ContextBuilder.fromInput()
        .addPlugin(new InputContextPlugin())
        .addPlugin(new LogContextPlugin())
        .addPlugin(plugin)
        .build();

      await ctx.use("exec").run("ls", "-la");
      // Because dry-run is enabled
      expect(exec).not.toHaveBeenCalled();
    });
  });
});
