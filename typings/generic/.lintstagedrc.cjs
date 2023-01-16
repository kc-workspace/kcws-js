const {
  default: defineConfig,
  Config,
  rush,
} = require("@kcws/lintstaged-config");

module.exports = defineConfig(
  Config.builder()
    .append("dts", {
      regexs: "**/*.d.ts",
      actionFn: rush("test"),
    })
    .build()
);
