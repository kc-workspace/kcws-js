const { default: defineConfig, Config } = require("@kcws/lintstaged-config");

module.exports = defineConfig(Config.builder().default().debugMode().build());
