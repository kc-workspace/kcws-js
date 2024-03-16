import type { IConfigValue } from ".";

import defineConfig, { Config } from ".";

describe("index", () => {
  it("exported defineConfig function", () => {
    expect(defineConfig).toBeTruthy();
  });

  it("exported Config class", () => {
    expect(Config).toBeTruthy();
  });

  it("default config", () => {
    expect(Config.default().build().length).toBeGreaterThan(0);
  });

  it.each([
    [
      {
        regexs: ["test.ts"],
        actions: "echo test",
      } as Partial<IConfigValue>,
      ["test.ts"],
      ["echo test"],
    ],
    [
      {
        regexs: ["test*.ts"],
        actionFn: (f) => `echo ${f.join(",")}`,
      } as Partial<IConfigValue>,
      ["test.ts", "test2.ts", "test3.ts"],
      ["echo test.ts,test2.ts,test3.ts"],
    ],
  ])(
    "defined %p config with filenames %p, should return %p",
    async (config, filenames, expected) => {
      const actual = await defineConfig(Config.builder().set("test", config))(
        filenames
      );

      expect(actual).toEqual(expected);
    }
  );

  it("log message if enable debug mode", async () => {
    const log = jest.spyOn(console, "log");
    const actual = await defineConfig(
      Config.builder()
        .set("test", {
          regexs: ["test.ts"],
          actions: "echo test",
        })
        .debugMode()
    )(["test.ts"]);

    expect(actual).toEqual(["echo test"]);

    expect(log).toHaveBeenNthCalledWith(1, "verifying test...");
    expect(log).toHaveBeenNthCalledWith(2, "found matched files [test.ts]");
    expect(log).toHaveBeenNthCalledWith(3, "resolve action: echo test");
    expect(log).toHaveBeenNthCalledWith(4, "static action: [echo test]");
    expect(log).toHaveBeenNthCalledWith(5, "resolve action: ");
    expect(log).toHaveBeenNthCalledWith(6, "dynamic action: []");
  });

  it.each([
    [
      ["test.ts", "test.yml", "test.yaml"],
      [
        "eslint --fix --max-warnings 0 test.ts",
        "prettier --write test.ts",
        "yamllint --config-file .github/linters/.yamllint.yml --strict test.yaml test.yml",
      ],
    ],
    [
      ["test.js", "test2.jsx"],
      [
        "eslint --fix --max-warnings 0 test.js test2.jsx",
        "prettier --write test.js test2.jsx",
      ],
    ],
    [
      ["test.json", "test.sh", "test.txt"],
      ["prettier --write test.json", "shellcheck test.sh"],
    ],
  ])(
    "default config with filenames %p, should return %p",
    async (filenames, expected) => {
      // defineConfig will always return as string[] to simplify the usage
      // however, ConfigFn still require to return CommandType
      // for accurate type of lintstaged config
      const actual = (await defineConfig(Config.default().build())(
        filenames
      )) as Array<string>;

      // We use contain because default config get absolute path of command
      // which is different on different machine
      for (const [index, value] of expected.entries()) {
        expect(actual[index]).toContain(value);
      }
    }
  );
});
