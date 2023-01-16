const {
  default: defineConfig,
  Config,
  generic,
} = require("@kcws/lintstaged-config");

// TODO: improve action by only run rush test on current package only
module.exports = defineConfig(
  Config.builder()
    .append("dts", {
      regexs: "**/*.d.ts",
      actions: generic("rush", "test"),
    })
    .build()
);
