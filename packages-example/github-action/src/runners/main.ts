import type { AppBuilderRunner } from "@kcws/github-actions";
import type builder from "../app";

const runner: AppBuilderRunner<typeof builder> = (data, context) => {
  const logger = context.use("log");

  logger.info("Use {0}: {1}", context.name, context.version);
  logger.info("hello {name}", data.input);
};

export default runner;
