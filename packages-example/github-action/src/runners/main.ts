import type app from "../app";

import { AppRunner } from "@kcws/github-actions";

const runner: AppRunner<typeof app> = (data, context) => {
  const logger = context.use("log");

  logger.info("Use {0}: {1}", context.name, context.version);
  logger.info("hello {name}", data.input);
};

export default runner;
