import { AppBuilder } from ".";
import { ContextBuilder, SimpleContext } from "../contexts";
import { mockPlugin, mockRunner, mockRunnerDataBuilder } from "../mocks";

const defaultContextBuilder = ContextBuilder.empty()
  .setName("@app/default")
  .setVersion("v0.7.8")
  .addPlugin(mockPlugin("default"));
const defaultDataBuilder = mockRunnerDataBuilder({ type: "default" });

const customContextBuilder = ContextBuilder.empty()
  .setName("@app/custom")
  .setVersion("v1.1.1")
  .addPlugin(mockPlugin("custom"));
const customDataBuilder = mockRunnerDataBuilder(
  { context: true },
  customContextBuilder
);

describe("actions.builder", () => {
  test("create empty, no data should be set", async () => {
    const builder = AppBuilder.empty();
    const app = builder.build();

    expect(app.context).toEqual(AppBuilder.defaultContext);

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      AppBuilder.defaultData,
      AppBuilder.defaultContext
    );
  });

  test("create with context builder", async () => {
    const builder = AppBuilder.fromContextBuilder(defaultContextBuilder);
    const app = builder.build();

    expect(app.context).toEqual(defaultContextBuilder.build());

    app.context.use("default").action();
    expect(app.context.plugins.default.mockAction).toHaveBeenCalledTimes(1);

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      AppBuilder.defaultData,
      expect.any(Object)
    );
  });

  test("create with context builder and context", () => {
    const newPlugin = mockPlugin("newPlugin");

    const builder = AppBuilder.fromContextBuilder(
      defaultContextBuilder
    ).setContext(ContextBuilder.empty().addPlugin(newPlugin).build());

    const app = builder.build();

    expect(app.context.name).toEqual("@app/default");
    expect(app.context.version).toEqual("v0.7.8");
    expect(app.context.has("default")).toEqual(true);
    expect(app.context.has("newPlugin")).toEqual(true);
    expect(app.context.use("newPlugin")).toEqual(newPlugin);
  });

  test("create with only context", () => {
    const context = new SimpleContext("@app/simple", "v9.3.2");
    const builder = AppBuilder.empty().setContext(context);
    const app = builder.build();

    expect(app.context).toEqual(context);
    expect(app.context.name).toEqual("@app/simple");
    expect(app.context.version).toEqual("v9.3.2");
  });

  test("create with data builder", async () => {
    const builder = AppBuilder.fromDataBuilder(defaultDataBuilder);
    const app = builder.build();

    expect(app.context).toEqual(AppBuilder.defaultContext);

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      { input: { type: "default" } },
      AppBuilder.defaultContext
    );
  });

  test("create with data builder and raw data", async () => {
    const builder = AppBuilder.fromDataBuilder(defaultDataBuilder).setData({
      input: { newData: true },
    });

    const app = builder.build();

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      { input: { type: "default", newData: true } },
      expect.any(Object)
    );
  });

  test("create with only raw data", async () => {
    const builder = AppBuilder.empty().setData({
      input: { data: "raw" },
    });

    const app = builder.build();

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      { input: { data: "raw" } },
      expect.any(Object)
    );
  });

  test("create with builders", async () => {
    const builder = AppBuilder.fromBuilders(
      customContextBuilder,
      customDataBuilder
    );
    const app = builder.build();

    expect(app.context).toEqual(customContextBuilder.build());

    const runner = mockRunner(app);
    await app.run(runner);

    expect(runner).toHaveBeenCalledTimes(1);
    expect(runner).toHaveBeenCalledWith(
      { input: { context: true } },
      expect.any(Object)
    );
  });

  describe("overridden builders", () => {
    test("contextBuilder", async () => {
      const builder = AppBuilder.fromContextBuilder(defaultContextBuilder);

      const app1 = builder.build();
      expect(app1.context).toEqual(defaultContextBuilder.build());
      expect(app1.context.has("default")).toEqual(true);
      expect(app1.context.has("custom")).toEqual(false);

      const app2 = builder
        .setContextBuilder(customContextBuilder, customDataBuilder)
        .build();
      expect(app2.context).toEqual(customContextBuilder.build());
      expect(app2.context.has("default")).toEqual(false);
      expect(app2.context.has("custom")).toEqual(true);
    });

    test("dataBuilder", async () => {
      const builder = AppBuilder.fromDataBuilder(defaultDataBuilder);

      const app1 = builder.build();
      const runner1 = mockRunner(app1);
      await app1.run(runner1);

      expect(runner1).toHaveBeenCalledTimes(1);
      expect(runner1).toHaveBeenCalledWith(
        { input: { type: "default" } },
        AppBuilder.defaultContext
      );

      const app2 = builder
        .setDataBuilder(mockRunnerDataBuilder({ type: "newDefault" }))
        .build();
      const runner2 = mockRunner(app2);
      await app2.run(runner2);

      expect(runner2).toHaveBeenCalledTimes(1);
      expect(runner2).toHaveBeenCalledWith(
        { input: { type: "newDefault" } },
        AppBuilder.defaultContext
      );
    });
  });
});
