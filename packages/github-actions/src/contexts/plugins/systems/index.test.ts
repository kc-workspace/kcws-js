jest.mock("@actions/core");
jest.mock("@actions/io");

import { addPath, exportVariable } from "@actions/core";
import { which } from "@actions/io";

import { SystemContextPlugin } from ".";
import { ContextBuilder } from "../../builder";

describe("contexts.plugins.systems", () => {
  const plugin = new SystemContextPlugin();
  const context = ContextBuilder.empty().addPlugin(plugin).build();

  const whichError = new Error("Unable to locate executable file");
  beforeEach(() => {
    mocked(which).mockImplementation((tool, check) => {
      if (tool === "echo") return Promise.resolve("/bin/echo");
      else if (check) {
        return Promise.reject(whichError);
      }
      return Promise.resolve("");
    });
  });

  afterEach(() => {
    mocked(which).mockReset();
  });

  test("add plugin should usable with use()", () => {
    expect(context.has("system")).toEqual(true);
    expect(context.use("system")).toEqual(plugin);
    expect(context.use("system").name).toEqual("system");
  });

  test("addPath", () => {
    context.use("system").addPath("/etc/mock/bin");

    expect(addPath).toHaveBeenCalledTimes(1);
    expect(addPath).toHaveBeenCalledWith("/etc/mock/bin");
  });

  test("addPaths", () => {
    context
      .use("system")
      .addPaths("/etc/mock1/bin", "/etc/mock2/bin", "/etc/mock3/bin");

    expect(addPath).toHaveBeenCalledTimes(3);
    expect(addPath).toHaveBeenNthCalledWith(1, "/etc/mock1/bin");
    expect(addPath).toHaveBeenNthCalledWith(2, "/etc/mock2/bin");
    expect(addPath).toHaveBeenNthCalledWith(3, "/etc/mock3/bin");
  });

  test("exportVariable", () => {
    context.use("system").setEnvVar("key", "value");
    expect(exportVariable).toHaveBeenCalledTimes(1);
    expect(exportVariable).toHaveBeenCalledWith("key", "value");
  });

  test.each([
    ["echo", false, "/bin/echo"],
    ["unknown", false, ""],
    ["echo", true, "/bin/echo"],
  ])(
    "when which('%s', check=%s) returns '%p'",
    async (tool, check, expected) => {
      const result = await context.use("system").which(tool, check);

      expect(which).toHaveBeenCalledTimes(1);
      expect(which).toHaveBeenCalledWith(tool, check);
      expect(result).toEqual(expected);
    }
  );

  test("when finding command 'unknown' with check='true' should throw error", async () => {
    const result = context.use("system").which("unknown", true);

    await expect(result).rejects.toEqual(whichError);
    expect(which).toHaveBeenCalledTimes(1);
    expect(which).toHaveBeenCalledWith("unknown", true);
  });
});
