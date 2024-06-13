import type app from "../app";

import { AppRunner } from "@kcws/github-actions";

const runner: AppRunner<typeof app> = (data, context) => {
  context.use("log").info("hello post {name}", data.input);
};

export default runner;
