import { Actions, ContextBuilder } from ".";

describe("actions", () => {
  it("default usage", async () => {
    const context = ContextBuilder.fromInput().build();
    const actions = Actions.builder(context, context => {
      return {
        name: context.name,
      };
    });

    await actions.exec(data => {
      expect(data.input.name).toEqual("");
    });
  });
});
