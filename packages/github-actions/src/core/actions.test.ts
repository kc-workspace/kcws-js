jest.mock("@actions/core");

import { setFailed } from "@actions/core";

import { Actions, AppRunner } from ".";
import { ContextBuilder } from "../contexts";
import { mockRunner } from "../utils/mocker";

const context = ContextBuilder.builder("", "").build();
const input = { a: "animal", b: "bee", c: 123, d: false };
const action = Actions.builder(context, () => input);

const exampleError = new Error("Something went wrong");

describe("core.actions", () => {
  test("use default data from builder", async () => {
    const function_: AppRunner<typeof action> = mockRunner(action);
    await action.exec(function_);

    expect(function_).toHaveBeenCalledTimes(1);
    expect(function_).toHaveBeenCalledWith({ input }, context);
  });

  test("use custom data", async () => {
    const function_ = mockRunner(action);
    await action.exec(function_, { c: 1234 });

    expect(function_).toHaveBeenCalledTimes(1);
    expect(function_).toHaveBeenCalledWith(
      {
        input: {
          a: "animal",
          b: "bee",
          c: 1234,
          d: false,
        },
      },
      context
    );
  });

  test("when throw exception", async () => {
    await action.exec(() => {
      throw exampleError;
    });

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(exampleError);
  });

  test("when throw exception on promise", async () => {
    await action.exec(async () => {
      throw exampleError;
    });

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(exampleError);
  });

  test("when promise failed", async () => {
    await action.exec(() => {
      return new Promise((_resolve, reject) => reject(exampleError));
    });

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(exampleError);
  });
});
