import { DefaultContext } from "../builder";
import { ContextPlugin } from "../builder.type";
import { LogContextPlugin } from "./loggers";

type IHelperContext = DefaultContext<{
  [key in LogContextPlugin["name"]]: LogContextPlugin;
}>;

export type IHelperContextPlugin = ContextPlugin<
  IHelperContext,
  "helper",
  (keyof IHelperContext["plugins"])[]
>;

/**
 * Context plugin allows user to executes frequency function in one goes
 * @public
 */
export class HelperContextPlugin implements IHelperContextPlugin {
  static defaultInfoMissingErr = "Action information is missing";
  static defaultUnknownNameErr = "unknown app";
  static defaultUnknownVersionErr = "unknown version";

  readonly name = "helper";
  readonly dependencies: IHelperContextPlugin["dependencies"] = ["log"];

  private context: IHelperContext | undefined;

  init(context: IHelperContext) {
    this.context = context;
  }

  logActionInfo() {
    this.context?.use("log").info(this.getActionInfo());
  }

  getActionInfo() {
    const appName = this.context?.name;
    const hasAppName = typeof appName === "string" && appName.length > 0;
    const appVersion = this.context?.version;
    const hasAppVersion =
      typeof appVersion === "string" && appVersion.length > 0;

    if (hasAppName && hasAppVersion) return `${appName}: ${appVersion}`;
    if (hasAppName)
      return `${appName}: ${HelperContextPlugin.defaultUnknownVersionErr}`;
    if (hasAppVersion)
      return `${HelperContextPlugin.defaultUnknownNameErr}: ${appVersion}`;
    return HelperContextPlugin.defaultInfoMissingErr;
  }
}
