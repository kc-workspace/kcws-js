import type { AppBuilderRunner } from "@kcws/github-actions";
import type builder from "../app";

const runner: AppBuilderRunner<typeof builder> = (data, context) => {
  context.use("log").info("hello post {name}", data.input);
};

export default runner;
