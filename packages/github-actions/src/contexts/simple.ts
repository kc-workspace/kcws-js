import type { BaseContext } from "./context.type";
import type { Plugins } from "./plugins/index.type";

import { MethodNotImplemented } from "../errors";

/**
 * Simple context is a context without plugins
 * @public
 */
export class SimpleContext implements BaseContext {
  readonly name;
  readonly version;
  readonly plugins = {};

  constructor(name: string = "", version: string = "") {
    this.name = name;
    this.version = version;
  }

  has(_: string): boolean {
    return false;
  }

  use(_: string): never {
    throw new MethodNotImplemented("SimpleContext.use()");
  }

  merge<PS extends Plugins>(
    _: BaseContext<PS>
  ): BaseContext<(typeof this)["plugins"] & PS> {
    throw new MethodNotImplemented("SimpleContext.merge()");
  }
}
