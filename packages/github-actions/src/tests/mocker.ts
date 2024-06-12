import type { Actions, Runner } from "../core";
import type { BaseContext } from "../contexts";

export const mockRunner = <Input extends object, Context extends BaseContext>(
  _: Actions<Input, Context>
) => {
  return jest.fn<Promise<void>, Parameters<Runner<Input, Context>>>();
};

export const mockEnvironment = <Environment extends NodeJS.ProcessEnv, T>(
  environment: Environment,
  callback: (environment_: Environment) => T
): T => {
  const mock = jest.replaceProperty(process, "env", environment);

  try {
    return callback(environment);
  } finally {
    mock.restore();
  }
};
