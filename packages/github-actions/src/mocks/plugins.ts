import type { BaseContext, ContextPlugin } from "../contexts";

interface MockContextPlugin<N extends string, DEPS extends string[] = never[]>
  extends ContextPlugin<N, BaseContext, DEPS> {
  readonly mockInit: jest.Mock<void, [BaseContext], this>;
  readonly mockAction: jest.Mock<void, [], this>;

  action(): void;
}

/**
 * For mocking Context plugin with additional function for testing
 *
 * @param name - plugin name
 * @param dependencies - plugin dependencies
 * @returns context plugin
 *
 * @public
 */
export const mockPlugin = <N extends string, DEPS extends string[] = never[]>(
  name: N,
  dependencies?: DEPS
): MockContextPlugin<N, DEPS> => {
  return new (class implements MockContextPlugin<N, DEPS> {
    readonly name = name;
    readonly dependencies = dependencies ?? ([] as unknown as Readonly<DEPS>);

    readonly mockInit = jest.fn<void, [BaseContext], this>();
    readonly mockAction = jest.fn<void, [], this>();

    init(context: BaseContext) {
      this.mockInit(context);
    }

    action() {
      return this.mockAction();
    }
  })();
};
