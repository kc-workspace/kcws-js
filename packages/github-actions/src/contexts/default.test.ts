import { DefaultContext } from ".";
import { ContextPluginNotFound } from "../errors";
import { mockPlugin } from "../mocks";

describe("contexts.context", () => {
  test("create empty context with constructor", () => {
    const context = new DefaultContext("", "", {});

    expect(context).not.toBeFalsy();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("");
    expect(context.plugins).toMatchObject({});
  });

  test("create with single plugin", () => {
    const plugin = mockPlugin("empty");
    const context = new DefaultContext("plugin", "v1.0.0", {
      [plugin.name]: plugin,
    });

    expect(context).not.toBeFalsy();
    expect(context.name).toEqual("plugin");
    expect(context.version).toEqual("v1.0.0");

    expect(context.plugins["empty"]).toEqual(plugin);
    expect(context.use("empty")).toEqual(plugin);

    expect(plugin.mockInit).toHaveBeenCalledTimes(1);
  });

  test("create with dependencies plugins", () => {
    const plugin1 = mockPlugin("empty", [] as string[]);
    const plugin2 = mockPlugin("depend", ["empty"]);
    const context = new DefaultContext("plugins", "v2.0.0", {
      [plugin1.name]: plugin1,
      [plugin2.name]: plugin2,
    });

    expect(context).not.toBeFalsy();
    expect(context.name).toEqual("plugins");
    expect(context.version).toEqual("v2.0.0");

    expect(context.plugins["empty"]).toEqual(plugin1);
    expect(context.use("depend")).toEqual(plugin2);

    expect(plugin1.mockInit).toHaveBeenCalledTimes(1);
    expect(plugin2.mockInit).toHaveBeenCalledTimes(1);
  });

  test("create with plugins and force initiate", () => {
    const plugin1 = mockPlugin("empty", [] as string[]);
    const plugin2 = mockPlugin("depend", ["empty"]);
    const context = new DefaultContext("", "", {
      [plugin1.name]: plugin1,
      [plugin2.name]: plugin2,
    });

    expect(context.use("depend")).toEqual(plugin2);
    // NOT recommend
    expect(context.plugins["empty"]).toEqual(plugin1);

    expect(plugin1.mockInit).toHaveBeenCalledTimes(1);
    expect(plugin2.mockInit).toHaveBeenCalledTimes(1);

    context.init();
    expect(plugin1.mockInit).toHaveBeenCalledTimes(1);
    expect(plugin2.mockInit).toHaveBeenCalledTimes(1);

    context.init(true);
    expect(plugin1.mockInit).toHaveBeenCalledTimes(3);
    expect(plugin2.mockInit).toHaveBeenCalledTimes(2);
  });

  test("use not exist plugin", () => {
    const context = new DefaultContext("", "", {});

    expect(() => context.use("example" as never)).toThrow(
      new ContextPluginNotFound("example")
    );
  });

  test("check plugins using has() function", () => {
    const plugin1 = mockPlugin("first", [] as string[]);
    const context = new DefaultContext("", "", {
      [plugin1.name]: plugin1,
    });

    expect(context.has("first")).toEqual(true);
    expect(context.has("test")).toEqual(false);
  });

  test("merge 2 contexts together", () => {
    const plugin1 = mockPlugin("first", [] as string[]);
    const context1 = new DefaultContext("ctx1", "v3.2.1", {
      [plugin1.name]: plugin1,
    });

    const plugin2 = mockPlugin("second", [] as string[]);
    const context2 = new DefaultContext("ctx2", "v1.2.3", {
      [plugin2.name]: plugin2,
    });

    const context = context1.merge(context2);
    expect(context.name).toEqual("ctx1");
    expect(context.version).toEqual("v3.2.1");
    expect(context.has("first")).toEqual(true);
    expect(context.use("first")).toEqual(plugin1);
    expect(context.has("second")).toEqual(true);
    expect(context.use("second")).toEqual(plugin2);
  });
});
