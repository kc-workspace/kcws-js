jest.mock("@actions/core");
jest.mock("@actions/io");
jest.mock("@actions/glob");

import { isDebug } from "@actions/core";
import { which, cp, mv } from "@actions/io";
import { create, hashFiles } from "@actions/glob";

import { IOContextPlugin } from ".";
import { ContextBuilder } from "../../builder";

describe("contexts.plugins.io", () => {
  const plugin = new IOContextPlugin();
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
    expect(context.has("io")).toEqual(true);
    expect(context.use("io")).toEqual(plugin);
    expect(context.use("io").name).toEqual("io");
  });

  test("move", async () => {
    await context.use("io").move("/etc/home", "/root/home");
    expect(mv).toHaveBeenCalledTimes(1);
    expect(mv).toHaveBeenCalledWith("/etc/home", "/root/home", undefined);
  });

  test("copy", async () => {
    await context.use("io").copy("/etc/home", "/root/home");
    expect(cp).toHaveBeenCalledTimes(1);
    expect(cp).toHaveBeenCalledWith("/etc/home", "/root/home", undefined);
  });

  describe("which()", () => {
    test.each([
      ["echo", false, "/bin/echo"],
      ["unknown", false, ""],
      ["echo", true, "/bin/echo"],
    ])(
      "when finding command '%s' with check='%s' should return '%p'",
      async (tool, check, expected) => {
        const result = await context.use("io").which(tool, check);

        expect(which).toHaveBeenCalledTimes(1);
        expect(which).toHaveBeenCalledWith(tool, check);
        expect(result).toEqual(expected);
      }
    );

    test("when finding command 'unknown' with check='true' should throw error", async () => {
      const result = context.use("io").which("unknown", true);

      await expect(result).rejects.toEqual(whichError);
      expect(which).toHaveBeenCalledTimes(1);
      expect(which).toHaveBeenCalledWith("unknown", true);
    });
  });

  test("createGlob", () => {
    context.use("io").createGlob("/tmp");

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith("/tmp", undefined);
  });

  describe("hash()", () => {
    test("with only filename", () => {
      mocked(isDebug).mockReturnValueOnce(false);

      context.use("io").hash("filename");

      expect(hashFiles).toHaveBeenCalledTimes(1);
      expect(hashFiles).toHaveBeenCalledWith(
        "filename",
        undefined,
        { followSymbolicLinks: true },
        false
      );
    });

    test("with debug enabled", () => {
      mocked(isDebug).mockReturnValueOnce(true);

      context.use("io").hash("filename");

      expect(hashFiles).toHaveBeenCalledTimes(1);
      expect(hashFiles).toHaveBeenCalledWith(
        "filename",
        undefined,
        { followSymbolicLinks: true },
        true
      );
    });

    test("with all arguments", () => {
      mocked(isDebug).mockReturnValueOnce(true);

      context.use("io").hash("filename", "/tmp");

      expect(hashFiles).toHaveBeenCalledTimes(1);
      expect(hashFiles).toHaveBeenCalledWith(
        "filename",
        "/tmp",
        { followSymbolicLinks: true },
        true
      );
    });
  });
});
