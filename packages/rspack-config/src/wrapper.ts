import type {
  Configuration,
  RspackPluginFunction,
  RspackPluginInstance,
} from "@rspack/core";

type Condition = () => boolean;

type Entry = Exclude<Configuration["entry"], undefined>;
type EntryRecord = Exclude<Entry, string | string[]>;
type EntryRecordValue = EntryRecord[string];

type Plugin = RspackPluginInstance | RspackPluginFunction;
type Plugins = Exclude<Configuration["plugins"], undefined>;

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

  setEntry(input: Entry, condition?: Condition): ConfigWrapper {
    if (condition === undefined || condition())
      return this.merge({ entry: input });
    return this;
  }

  addEntry(input: EntryRecord, condition?: Condition): ConfigWrapper {
    const entry = {
      ...this.convertEntryRecord(this.base.entry),
      ...input,
    };
    return this.setEntry(entry, condition);
  }

  addEntryByName(
    name: string,
    value: EntryRecordValue,
    condition?: Condition
  ): ConfigWrapper {
    const record = { [name]: value };
    return this.addEntry(record, condition);
  }

  setPlugins(plugins: Plugins, condition?: Condition) {
    if (condition === undefined || condition())
      return this.merge({ plugins: plugins });
    return this;
  }

  addPlugins(plugin: Plugin, condition?: Condition) {
    const plugins = this.base.plugins ?? [];
    return this.setPlugins([...plugins, plugin], condition);
  }

  private convertEntryRecord(entry: Entry | undefined): EntryRecord {
    if (entry === undefined) return {};
    if (typeof entry === "string") return { default: entry };
    if (Array.isArray(entry)) return { default: entry };
    return entry;
  }
}
