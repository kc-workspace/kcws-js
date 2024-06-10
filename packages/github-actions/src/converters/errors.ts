export class ConvertError<T> extends Error {
  constructor(data: T, type: string, reason?: Error) {
    const d = data as string;
    const dt = typeof data;
    const t = type;
    const m = reason?.message ?? "unknown error occurred";

    super(`Cannot convert ${d} (${dt}) to ${t} because '${m}'`);
  }
}
