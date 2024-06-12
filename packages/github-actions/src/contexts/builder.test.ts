import {
  BaseContext,
  ContextBuilder,
  DefaultContext,
  type ContextPlugin,
} from ".";

class EmptyPlugin implements ContextPlugin<BaseContext, "empty"> {
  readonly dependencies = [];
  readonly name = "empty";
  init() {}
}

class DependsPlugin implements ContextPlugin<BaseContext, "depend", ["empty"]> {
  readonly dependencies: ["empty"] = ["empty"];
  readonly name = "depend";
  init() {}
}

describe("context.builder", () => {
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
    const context = ContextBuilder.fromPackageJson().build();
    // By default it will check package.json file from script (code) directory
    // NOT current directory because when we run on GitHub Actions,
    // current directory will be repository which we run action on
    // so we won't get Actions metadata but application metadata instead.
    expect(context.name).toEqual("");
    expect(context.version).toEqual("");
  });

  test("create context from current package.json", () => {
    const context = ContextBuilder.fromPackageJson(process.cwd()).build();
    // By default it will check package.json file from script (code) directory
    // NOT current directory because when we run on GitHub Actions,
    // current directory will be repository which we run action on
    // so we won't get Actions metadata but application metadata instead.
    expect(context.name).toEqual("@kcws/github-actions");
    expect(context.version).not.toEqual("");
  });

  describe("from BaseContext", () => {
    test("should copy context version", () => {
      const baseContext = new (class Context implements BaseContext {
        name: string = "example";
        version: string = "v1.0.0";
      })();

      const context = ContextBuilder.fromBaseContext(baseContext).build();
      expect(context.name).toEqual(baseContext.name);
      expect(context.version).toEqual(baseContext.version);
    });

    test("should no default data", () => {
      const baseContext = new (class Context implements BaseContext {
        name: string = "";
        version: string = "";
      })();

      const context = ContextBuilder.fromBaseContext(baseContext).build();
      expect(context.name).toEqual("");
      expect(context.version).toEqual("");
    });
  });

  describe("from Context", () => {
    test("should copy from new object", () => {
      const defaultContext = new DefaultContext("hello", "v1.0.0", {});

      const context = ContextBuilder.fromContext(defaultContext).build();
      expect(context.name).toEqual(defaultContext.name);
      expect(context.version).toEqual(defaultContext.version);
    });

    test("should copy from builder", () => {
      const defaultContext = ContextBuilder.fromInput("a", "v1.1.1").build();

      const context = ContextBuilder.fromContext(defaultContext).build();
      expect(context.name).toEqual(defaultContext.name);
      expect(context.version).toEqual(defaultContext.version);
    });

    test("should copy plugins", () => {
      const defaultContext = ContextBuilder.empty()
        .addPlugin(new EmptyPlugin())
        .addPlugin(new DependsPlugin())
        .build();

      const context = ContextBuilder.fromContext(defaultContext).build();
      expect(context.name).toEqual(defaultContext.name);
      expect(context.version).toEqual(defaultContext.version);
    });
  });

  test("custom builder name", () => {
    const builder = ContextBuilder.empty().setName("example");

    const context = builder.build();
    expect(context.name).toEqual("example");
    expect(context.version).toEqual("");
  });

  test("custom builder version", () => {
    const builder = ContextBuilder.empty().setVersion("v1.1.1");

    const context = builder.build();
    expect(context.name).toEqual("");
    expect(context.version).toEqual("v1.1.1");
  });

  describe("plugins", () => {
    class TestPlugin implements ContextPlugin<BaseContext, "test", never[]> {
      readonly dependencies: never[] = [];
      readonly name = "test";
      init() {}

      call() {
        return "hello";
      }
    }

    class NextPlugin implements ContextPlugin<BaseContext, "next", ["test"]> {
      readonly dependencies: ["test"] = ["test"];
      readonly name = "next";
      init() {}

      call() {
        return "hello";
      }
    }

    test("use test plugin", () => {
      const context = ContextBuilder.empty()
        .addPlugin(new TestPlugin())
        .addPlugin(new NextPlugin())
        .build();

      expect(context.use("test").name).toEqual("test");
      expect(context.use("test").call()).toEqual("hello");
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
      test: new (class TestContextPlugin
        implements ContextPlugin<BaseContext, "test">
      {
        readonly name = "test";
        readonly dependencies: never[] = [];
        init() {}
      })(),
    });

    expect(context.use("test").name).toEqual("test");
  });
});
