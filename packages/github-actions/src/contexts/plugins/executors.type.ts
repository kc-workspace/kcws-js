export interface CapturedResult {
  stdout?: Buffer;
  stderr?: Buffer;
  code: number;
}
