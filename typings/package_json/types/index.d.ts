declare global {
  interface PackageRepository {
    type: "git";
    url: string;
    directory?: string;
  }

  interface PackageBugReport {
    email?: string;
    url?: string;
  }

  interface PackageAuthor {
    name: string;
    email?: string;
    url?: string;
  }

  interface PackagePublishConfig {
    access: "public" | "restricted";
  }

  interface TypedocConfig {
    entryPoint: string;
  }

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

declare const pkg: Package;
export default pkg;
