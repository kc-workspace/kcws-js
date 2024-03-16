import { RuleConfigSeverity } from "@commitlint/types";

class CommitlintConfig {
  /** @param {import("@commitlint/types").UserConfig} config */
  constructor(config) {
    this.config = config;
  }

  /**
   *
   * @param {(config: import("@commitlint/types").UserConfig) => import("@commitlint/types").UserConfig} fn
   */
  update(fn) {
    this.config = fn(this.config);
    return this;
  }

  /**
   * @param {{
   *    key: string,
   *    title: string,
   *    description: string,
   *    emoji: string,
   * }} options - type options
   */
  addNewType(options) {
    this.config.rules["type-enum"][2].push(options.key);
    this.config.prompt.questions.type.enum[options.key] = {
      title: options.title,
      description: options.description,
      emoji: options.emoji,
    };
    return this;
  }

  /**
   * @param {{
   *    key: string,
   *    title: string,
   *    description: string,
   * }} options - scope options
   */
  addNewScope(options) {
    this.config.rules["scope-enum"][2].push(options.key);
    this.config.prompt.questions.scope.enum[options.key] = {
      title: options.title,
      description: options.description,
    };
    return this;
  }

  build() {
    return this.config;
  }
}

const RuleConfigCondition = {
  Always: "always",
  Never: "never",
};

const RuleConfigCaseType = {
  CamelCase: "camel-case",
  KebabCase: "kebab-case",
  SnakeCase: "snake-case",
  PascalCase: "pascal-case",
  StartCase: "start-case",
  UpperCase: "upper-case",
  SentenceCase: "sentence-case",
  LowerCase: "lower-case",
};

const config = new CommitlintConfig({
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [RuleConfigSeverity.Error, RuleConfigCondition.Always, []],
    "scope-enum": [RuleConfigSeverity.Error, RuleConfigCondition.Always, []],
    "subject-max-length": [
      RuleConfigSeverity.Warning,
      RuleConfigCondition.Always,
      80,
    ],
    "subject-case": [
      RuleConfigSeverity.Error,
      RuleConfigCondition.Always,
      RuleConfigCaseType.LowerCase,
    ],
    "body-case": [
      RuleConfigSeverity.Error,
      RuleConfigCondition.Always,
      [RuleConfigCaseType.SentenceCase, RuleConfigCaseType.LowerCase],
    ],
    "body-max-line-length": [
      RuleConfigSeverity.Warning,
      RuleConfigCondition.Always,
      120,
    ],
  },
  prompt: {
    questions: {
      type: {
        enum: {},
      },
      scope: {
        enum: {},
      },
    },
    settings: {
      enableMultipleScopes: false,
    },
  },
});

config
  .addNewType({
    key: "feat",
    title: "Features",
    description: "A new feature",
    emoji: "✨",
  })
  .addNewType({
    key: "perf",
    title: "Performance Improvements",
    description: "A code change that improves performance",
    emoji: "🚀",
  })
  .addNewType({
    key: "fix",
    title: "Bug Fixes",
    description: "A bug fix",
    emoji: "🐛",
  })
  .addNewType({
    key: "test",
    title: "Tests",
    description: "Adding missing tests or correcting existing tests",
    emoji: "🚨",
  })
  .addNewType({
    key: "ci",
    title: "Continuous Integrations",
    description: "Changes to our CI configuration files and scripts",
    emoji: "⚙️",
  })
  .addNewType({
    key: "docs",
    title: "Documentation",
    description: "Documentation only changes",
    emoji: "📚",
  })
  .addNewType({
    key: "refactor",
    title: "Code Refactoring",
    description: "A code change that neither fixes a bug nor adds a feature",
    emoji: "📦",
  })
  .addNewType({
    key: "chore",
    title: "Chores",
    description: "Other changes that don't modify src or test files",
    emoji: "♻️",
  });

config
  .addNewScope({
    key: "core",
    title: "Core",
    description: "Core rush package",
  })
  .addNewScope({
    key: "color",
    title: "Color package",
    description: "@kcws/color package",
  })
  .addNewScope({
    key: "dtcheck",
    title: "Datatype checker package",
    description: "@kcws/dtcheck package",
  })
  .addNewScope({
    key: "equals",
    title: "Equals package",
    description: "@kcws/equals package",
  })
  .addNewScope({
    key: "error",
    title: "Errors package",
    description: "@kcws/error package",
  })
  .addNewScope({
    key: "mixin",
    title: "Mixin package",
    description: "@kcws/mixin package",
  })
  .addNewScope({
    key: "random",
    title: "Random package",
    description: "@kcws/random package",
  })
  .addNewScope({
    key: "reset.css",
    title: "ResetCSS package",
    description: "@kcws/reset.css package",
  })
  .addNewScope({
    key: "heft-node-rig",
    title: "Heft node riggable package",
    description: "@kcws/heft-node-rig & @kcinternals/heft-node-rig package",
  })
  .addNewScope({
    key: "heft-web-rig",
    title: "Heft web riggable package",
    description: "@kcws/heft-web-rig & @kcinternals/heft-web-rig package",
  })
  .addNewScope({
    key: "heft-types-rig",
    title: "Heft types riggable package",
    description: "@kcinternals/heft-types-rig package",
  })
  .addNewScope({
    key: "heft-esbuild-plugin",
    title: "Heft esbuild plugin",
    description: "@kcws/heft-esbuild-plugin package",
  })
  .addNewScope({
    key: "heft-stryker-plugin",
    title: "Heft stryker plugin",
    description: "@kcws/heft-stryker-plugin package",
  })
  .addNewScope({
    key: "eslint-config",
    title: "Eslint config",
    description: "@kcws/eslint-config package",
  })
  .addNewScope({
    key: "prettier-config",
    title: "Prettier config",
    description: "@kcws/prettier-config package",
  })
  .addNewScope({
    key: "lintstaged-config",
    title: "Lintstaged config",
    description: "@kcws/lintstaged-config package",
  })
  .addNewScope({
    key: "rspack-config",
    title: "RSPack config",
    description: "@kcws/rspack-config package",
  })
  .addNewScope({
    key: "types",
    title: "Types definition",
    description: "all @types/* packages",
  })
  .addNewScope({
    key: "rush-api-documenter",
    title: "Rush api-documenter",
    description: "rush-api-documenter autoinstaller",
  })
  .addNewScope({
    key: "rush-commitlint",
    title: "Rush commitlint",
    description: "rush-commitlint autoinstaller",
  })
  .addNewScope({
    key: "rush-dependencies-updater",
    title: "Rush dependencies-updater",
    description: "rush-dependencies-updater autoinstaller",
  })
  .addNewScope({
    key: "rush-lintstaged",
    title: "Rush lintstaged",
    description: "rush-lintstaged autoinstaller",
  })
  .addNewScope({
    key: "deps",
    title: "Dependencies",
    description: "add or upgrade dependencies",
  })
  .addNewScope({
    key: "config",
    title: "Configuration",
    description: "any configurations on both core and in packages",
  })
  .addNewScope({
    key: "example",
    title: "Example",
    description: "@kcexample/* packages",
  });

export default config.build();
