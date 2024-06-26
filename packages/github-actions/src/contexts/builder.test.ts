import { ContextBuilder, SimpleContext } from ".";
import { FileNotFound } from "../errors";
import { mockPlugin } from "../mocks";

describe("contexts.builder", () => {
  test("create empty context", () => {
    const context = ContextBuilder.empty().build();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("");
  });

  test("create context with name", () => {
    const context = ContextBuilder.fromInput("hello").build();
    expect(context.name).toEqual("hello");
    expect(context.version).toEqual(ContextBuilder.defaultVersion);
  });

  test("create context with version", () => {
    const context = ContextBuilder.fromInput(undefined, "v1.0.0").build();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("v1.0.0");
  });

  test("create context with all metadata", () => {
    const context = ContextBuilder.fromInput("hello", "v1.0.0").build();
    expect(context.name).toEqual("hello");
    expect(context.version).toEqual("v1.0.0");
  });

  test("create context from default package.json", () => {
    const context = ContextBuilder.fromPackageJson(__dirname).build();
    // By default it will check package.json file from script (code) directory
    // NOT current directory because when we run on GitHub Actions,
    // current directory will be repository which we run action on
    // so we won't get Actions metadata but application metadata instead.
    expect(context.name).toEqual("@kcws/github-actions");
    expect(context.version).toEqual(expect.any(String));
  });

  test("create context from unknown json file, throws error", () => {
    expect(() => ContextBuilder.fromPackageJson("/tmp", "a.json")).toThrow(
      new FileNotFound("/tmp", "a.json")
    );
  });

  test("create context from empty SimpleContext", () => {
    const baseContext = new SimpleContext();

    // When use fromContext(), no default value will be use
    const context = ContextBuilder.fromContext(baseContext).build();
    expect(context.name).toEqual(baseContext.name);
    expect(context.version).toEqual(baseContext.version);
    expect(context.plugins).toEqual(baseContext.plugins);
  });

  test("create context from named SimpleContext", () => {
    const baseContext = new SimpleContext("example", undefined);

    const context = ContextBuilder.fromContext(baseContext).build();
    expect(context.name).toEqual(baseContext.name);
    expect(context.version).toEqual(""); // version cannot be undefined
    expect(context.plugins).toEqual(baseContext.plugins);
  });

  test("create context from version SimpleContext", () => {
    const baseContext = new SimpleContext(undefined, "v0.1.1");

    const context = ContextBuilder.fromContext(baseContext).build();
    expect(context.name).toEqual(""); // name cannot be undefined
    expect(context.version).toEqual(baseContext.version);
    expect(context.plugins).toEqual(baseContext.plugins);
  });

  test("create context from SimpleContext", () => {
    const baseContext = new SimpleContext("example", "v0.1.1");

    const context = ContextBuilder.fromContext(baseContext).build();
    expect(context.name).toEqual(baseContext.name);
    expect(context.version).toEqual(baseContext.version);
    expect(context.plugins).toEqual(baseContext.plugins);
  });

  test("create context from another DefaultContext", () => {
    const baseContext = ContextBuilder.fromContext(
      new SimpleContext("simple", "v0.5.5")
    )
      .addPlugin(mockPlugin("example"))
      .addPlugin(mockPlugin("hello", ["example"] as const))
      .build();

    const builder = ContextBuilder.fromContext(baseContext);

    expect(builder.build().name).toEqual("simple");
    expect(builder.build().version).toEqual("v0.5.5");
    expect(builder.build().plugins).toMatchObject({
      example: expect.any(Object),
      hello: expect.any(Object),
    });

    builder.setName("complex").setVersion("v0.7.7");

    expect(builder.build().name).toEqual("complex");
    expect(builder.build().version).toEqual("v0.7.7");
    expect(builder.build().plugins).toMatchObject({
      example: expect.any(Object),
      hello: expect.any(Object),
    });

    builder.addPlugin(mockPlugin("world", ["hello"] as const));

    expect(builder.build().plugins).toMatchObject({
      example: expect.any(Object),
      hello: expect.any(Object),
      world: expect.any(Object),
    });
  });

  test("create with empty()", () => {
    const builder = ContextBuilder.empty().setName("example");
    expect(builder.build().name).toEqual("example");
    expect(builder.build().version).toEqual("");

    builder.setVersion("v2.1.0");
    expect(builder.build().name).toEqual("example");
    expect(builder.build().version).toEqual("v2.1.0");
  });
});

describe("contexts.plugins", () => {
  test("use plugin", () => {
    const context = ContextBuilder.empty()
      .addPlugin(mockPlugin("test"))
      .build();

    context.use("test").action();
    expect(context.plugins.test.mockInit).toHaveBeenCalledTimes(1);
    expect(context.plugins.test.mockAction).toHaveBeenCalledTimes(1);
  });
});
