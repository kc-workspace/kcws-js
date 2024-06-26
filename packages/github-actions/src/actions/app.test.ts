jest.mock("@actions/core");

import { setFailed } from "@actions/core";

import { AppBuilder } from "./builder";
import { mockRunner } from "../mocks";

describe("actions.app", () => {
  test("setFailed when throws errors", async () => {
    const error = new Error("random error message");
    const app = AppBuilder.empty()
      .setDataBuilder(() => {
        throw error;
      })
      .build();

    await app.run(mockRunner(app));
    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(error);
  });

  test("set beforeInit hook", async () => {
    const beforeInit = jest.fn();
    const app = AppBuilder.empty().setHook("beforeInit", beforeInit).build();

    await app.run(mockRunner(app));
    expect(beforeInit).toHaveBeenCalledTimes(1);
    expect(beforeInit).toHaveBeenCalledWith(app.context);
  });

  test("set all hooks", async () => {
    const data = { input: { builder: "data" } };
    const customData = { input: { builder: "raw" } };

    const beforeInit = jest.fn();
    const afterFetchData = jest.fn();
    const afterMergeData = jest.fn();
    const beforeRunner = jest.fn();
    const afterRunner = jest.fn();
    const afterFinish = jest.fn();
    const afterFail = jest.fn();

    const app = AppBuilder.empty()
      .setHooks({
        beforeInit,
        afterFetchData,
        afterMergeData,
        beforeRunner,
        afterRunner,
        afterFinish,
        afterFail,
      })
      .setData(data)
      .build();

    await app.run(mockRunner(app), customData.input);

    expect(beforeInit).toHaveBeenCalledTimes(1);
    expect(beforeInit).toHaveBeenCalledWith(app.context);

    expect(afterFetchData).toHaveBeenCalledTimes(1);
    expect(afterFetchData).toHaveBeenCalledWith(app.context, data);

    expect(afterMergeData).toHaveBeenCalledTimes(1);
    expect(afterMergeData).toHaveBeenCalledWith(app.context, customData);

    expect(beforeRunner).toHaveBeenCalledTimes(1);
    expect(beforeRunner).toHaveBeenCalledWith(app.context, customData);

    expect(afterRunner).toHaveBeenCalledTimes(1);
    expect(afterRunner).toHaveBeenCalledWith(app.context, customData);

    expect(afterFinish).toHaveBeenCalledTimes(1);
    expect(afterFinish).toHaveBeenCalledWith(app.context);

    expect(afterFail).not.toHaveBeenCalled();
  });
});
