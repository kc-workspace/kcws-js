declare global {
  /**
   * The repository field on package.json file.
   */
  interface PackageRepository {
    type: "git";
    url: string;
    directory?: string;
  }

  /**
   * The bugs field on package.json file.
   */
  interface PackageBugReport {
    email?: string;
    url?: string;
  }

  /**
   * The author field on package.json file.
   */
  interface PackageAuthor {
    name: string;
    email?: string;
    url?: string;
  }

  /**
   * The publishConfig field on package.json file.
   */
  interface PackagePublishConfig {
    access: "public" | "restricted";
  }

  /**
   * Custom typedoc field on package.json file.
   */
  interface TypedocConfig {
    entryPoint: string;
  }

  /**
   * The package.json schema.
   */
  interface Package {
    name: string;
    version: string;
    private?: boolean;
    description?: string;
    typedoc?: TypedocConfig;
    main?: string;
    module?: string;
    browser?: string;
    types?: string;
    license?: string;
    homepage?: string;
    repository?: string | PackageRepository;
    bugs?: string | PackageBugReport;
    author?: string | PackageAuthor;
    publishConfig?: PackagePublishConfig;
    keywords?: string[];
    files?: string[];
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  }

  type OptionalPackage = Partial<Package>;
  type ReadonlyPackage = Readonly<Package>;
  type OptionalReadonlyPackage = Readonly<OptionalPackage>;
}

/**
 * @internal
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
declare const pkg: globalThis.Package;
export default pkg;
