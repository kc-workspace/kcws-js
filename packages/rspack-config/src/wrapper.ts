import type { Configuration } from "@rspack/cli";

type Entry = Exclude<Configuration["entry"], undefined>;
type EntryRecord = Exclude<Entry, string | string[]>;
type EntryRecordValue = EntryRecord[string];
type EntryCondition = () => boolean;

export class ConfigWrapper {
  constructor(private base: Configuration) {}

  get config(): Configuration {
    return this.base;
  }

  set(config: Configuration): ConfigWrapper {
    return new ConfigWrapper(config);
  }

  merge(config: Configuration): ConfigWrapper {
    return new ConfigWrapper({ ...this.base, ...config });
  }

  setEntry(input: Entry, condition?: EntryCondition): ConfigWrapper {
    if (condition === undefined || condition())
      return this.merge({ entry: input });
    return this;
  }

  addEntry(input: EntryRecord, condition?: EntryCondition): ConfigWrapper {
    const entry = {
      ...this.convertEntryRecord(this.base.entry),
      ...input,
    };
    return this.setEntry(entry, condition);
  }

  addEntryByName(
    name: string,
    value: EntryRecordValue,
    condition?: EntryCondition
  ): ConfigWrapper {
    const record = { [name]: value };
    return this.addEntry(record, condition);
  }

  private convertEntryRecord(entry: Entry | undefined): EntryRecord {
    if (entry === undefined) return {};
    if (typeof entry === "string") return { default: entry };
    if (Array.isArray(entry)) return { default: entry };
    return entry;
  }
}
