/**
 * When Plugin is missing in Context
 * @public
 */
export class ContextPluginNotFound<K> extends Error {
  constructor(name: K) {
    super(`Plugin '${name}' is missing from current Context`);
  }
}

/**
 * When require file is missing
 * @public
 */
export class FileNotFound extends Error {
  constructor(basedir: string, filename: string) {
    super(`${filename} is missing from directory '${basedir}'`);
  }
}

/**
 * When calling not implemented method
 * @public
 */
export class MethodNotImplemented extends Error {
  constructor(method: string) {
    super(`'${method}' not implemented`);
  }
}
