/**
 * For mocking environment variables. Only works with `jest`
 *
 * @param environment - list of environments
 * @param callback - function to read those environments
 * @returns function returns
 *
 * @public
 */
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
