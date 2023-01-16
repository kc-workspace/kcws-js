const {
  default: defineConfig,
  Config,
  rush,
} = require("@kcws/lintstaged-config");

module.exports = defineConfig(
  Config.builder()
    .default()
    .append("dts", {
      regexs: ["**/*.css", "**/*.scss", "**/*.sass"],
      actionFn: rush("test"),
    })
    .build()
);
