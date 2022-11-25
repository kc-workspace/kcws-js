const {
  default: defineConfig,
  Config,
  generic,
} = require("@kcws/lintstaged-config");

module.exports = defineConfig(
  Config.builder()
    .append("dts", {
      regexs: "**/*.d.ts",
      actions: generic("rush", "test"),
    })
    .build()
);
