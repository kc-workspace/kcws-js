import { AppRunner } from "@kcws/github-actions";

import app from "../app";

const runner: AppRunner<typeof app> = (data, context) => {
  context.use("log").info("hello post {name}", data.input);
};

export default runner;
