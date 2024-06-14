/**
 * The result from {@link ExecContextPlugin} capture function
 *
 * @public
 */
export interface CapturedResult {
  stdout?: Buffer;
  stderr?: Buffer;
  code: number;
}
