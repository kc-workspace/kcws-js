import { Config } from "./Config";

describe("Config", () => {
  describe("Builder", () => {
    it("creatable", () => {
      expect(Config.builder()).toBeTruthy();
    });
    it("buildable", () => {
      expect(Config.builder().build()).toBeTruthy();
    });
  });

  it("match nothing", () => {
    return expect(
      Config.builder()
        .set("test", {})
        .build()
        .getCommands(() => [])
    ).resolves.toEqual([]);
  });

  it("regex first match", async () => {
    const config = Config.builder()
      .set("test", {
        regexs: ["test*.json"],
        actions: ["echo 'hello world'"],
      })
      .append("test", { actions: ["echo 'hello next'"] })
      .append("", { actions: ["echo 'hello empty'"] })
      .build();

    const result1 = await config.getCommands((_, regex) =>
      regex.length === 1 ? ["found"] : []
    );
    expect(result1).toEqual(["echo 'hello world'", "echo 'hello next'"]);

    const result2 = await config.getCommands((_, re) =>
      re.length === 0 ? ["found"] : []
    );
    expect(result2).toEqual(["echo 'hello empty'"]);
  });

  it.each([
    ["1", "echo 'hello test1'"],
    ["2", "echo 'hello test2'"],
    ["3", "echo 'hello test3'"],
  ])("regex '%s' will return action '%s'", (input, action) => {
    const config = Config.builder()
      .set("test1", {
        regexs: ["1"],
        actions: ["echo 'hello test1'"],
      })
      .set("test2", {
        regexs: ["2"],
        actions: ["echo 'hello test2'"],
      })
      .set("test3", {
        regexs: ["3"],
        actions: ["echo 'hello test3'"],
      })
      .build();

    return expect(
      config.getCommands((_, regex) => {
        return regex[0] === input ? ["found"] : [];
      })
    ).resolves.toEqual([action]);
  });

  it("default", () => {
    expect(Config.builder().default().build().length).toBeGreaterThan(0);
  });

  it("adding group", () => {
    expect(
      Config.builder().set("test", {}).set("test2", {}).set("test3", {}).build()
        .length
    ).toEqual(3);
  });

  it("deleting group", () => {
    const builder = Config.builder().set("test1", {}).set("test2", {});

    expect(builder.build().length).toEqual(2);

    builder.delete("test2");

    expect(builder.build().length).toEqual(1);
  });
});
