import { ContextBuilder, DefaultContext, type ContextPlugin } from ".";

describe("context.builder", () => {
  test("create empty context", () => {
    const context = ContextBuilder.builder().build();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("v0.0.0-dev");
  });

  test("create named context", () => {
    const context = ContextBuilder.builder("hello").build();
    expect(context.name).toEqual("hello");
    expect(context.version).toEqual("v0.0.0-dev");
  });

  test("create context", () => {
    const context = ContextBuilder.builder("hello", "v1.0.0").build();
    expect(context.name).toEqual("hello");
    expect(context.version).toEqual("v1.0.0");
  });

  test("custom builder name", () => {
    const builder = ContextBuilder.builder().setName("example");

    const context = builder.build();
    expect(context.name).toEqual("example");
    expect(context.version).toEqual("v0.0.0-dev");
  });

  test("custom builder version", () => {
    const builder = ContextBuilder.builder().setVersion("v1.1.1");

    const context = builder.build();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("v1.1.1");
  });

  describe("plugins", () => {
    class TestPlugin implements ContextPlugin<"test"> {
      readonly name = "test";
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      init() {}
    }

    test("use test plugin", () => {
      const context = ContextBuilder.builder()
        .addPlugin(new TestPlugin())
        .build();

      expect(context.use("test").name).toEqual("test");
    });
  });
});

describe("context.defaults", () => {
  test("create empty context", () => {
    const context = new DefaultContext("", "v0.0.0", {});

    expect(context.name).toEqual("");
    expect(context.version).toEqual("v0.0.0");
  });

  test("create with plugin", () => {
    const context = new DefaultContext("", "v0.0.0", {
      test: new (class TestContextPlugin implements ContextPlugin<"test"> {
        readonly name = "test";

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        init() {}
      })(),
    });

    expect(context.use("test").name).toEqual("test");
  });
});
