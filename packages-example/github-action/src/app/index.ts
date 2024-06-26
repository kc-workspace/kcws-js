import {
  AppBuilder,
  ContextBuilder,
  EnvContextPlugin,
  ExecContextPlugin,
  InputContextPlugin,
  LogContextPlugin,
} from "@kcws/github-actions";

export const contextBuilder = ContextBuilder.fromPackageJson(__dirname)
  .addPlugin(new EnvContextPlugin())
  .addPlugin(new LogContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin());

export default AppBuilder.fromBuilders(contextBuilder, (context) => {
  return {
    input: {
      name: context.use("input").requiredString("name"),
    },
  };
});
