import type { BaseContext, ContextBuilder } from "../contexts";
import type { AppContext, BaseApp, RunnerData } from "../actions";
import type { AppData, RunnerDataBuilder } from "../actions/app.type";

import { DataFromBuilder } from "../builders/builder.type";

/**
 * For mocking application runner
 *
 * @param _app - Application
 * @returns runner function
 *
 * @public
 */
export const mockRunner = <
  APP extends BaseApp<BaseContext, NonNullable<unknown>>,
>(
  _app: APP
): jest.Mock<
  void | Promise<void>,
  [RunnerData<AppData<APP>>, AppContext<APP>]
> => {
  return jest.fn();
};

/**
 * For mocking RunnerDataBuilder from input and context builder
 * @param input - output data
 * @param _builder - context builder
 * @returns runner data builder with input data and context
 *
 * @public
 */
export const mockRunnerDataBuilder = <
  I,
  CB extends ContextBuilder = ContextBuilder,
>(
  input: I,
  _builder?: CB
): RunnerDataBuilder<DataFromBuilder<CB>, I> => {
  return () => mockRunnerData(input);
};

/**
 * For mocking RunnerData from input value
 * @param input - output data
 * @returns runner data with input data
 *
 * @public
 */
export const mockRunnerData = <I>(input: I): RunnerData<I> => {
  return {
    input,
  };
};
