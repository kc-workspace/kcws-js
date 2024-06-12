import {
  ContextBuilder,
  InputContextPlugin,
  LogContextPlugin,
  Actions,
  ExecContextPlugin,
} from "@kcws/github-actions";

export const context = ContextBuilder.fromPackageJson()
  .addPlugin(new LogContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build();

export default Actions.builder(context, (context) => {
  return {
    name: context.use("input").optionalString("name") ?? "world",
  };
});
