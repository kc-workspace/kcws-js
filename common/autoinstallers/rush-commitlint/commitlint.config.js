/**
 * @type {import("@commitlint/types").UserConfig}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "perf", "fix", "test", "ci", "docs", "refactor", "chore"],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "core",
        "color",
        "dtcheck",
        "equals",
        "mixin",
        "random",
        "reset.css",
        "node-rig",
        "web-rig",
        "eslint-config",
        "lintstaged-config",
        "types",
        "rush-api-documenter",
        "rush-commitlint",
        "rush-dependencies-updater",
        "rush-lintstaged",
        "config",
      ],
    ],
    "subject-max-length": [1, "always", 80],
    "subject-case": [2, "always", "lower-case"],
    "body-case": [2, "always", ["sentence-case", "lower-case"]],
    "body-max-line-length": [1, "always", 80],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
          },
          ci: {
            description:
              "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
          },
          refactor: {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
          },
        },
      },
      scope: {
        description:
          "What is the scope of this change (e.g. component or file name)",
        enum: {
          core: {
            description: "Core rush package",
            title: "Core",
          },
          color: {
            description: "@kcws/color package",
            title: "Color",
          },
          dtcheck: {
            description: "@kcws/dtcheck package",
            title: "Datatype Check",
          },
          equals: {
            description: "@kcws/equals package",
            title: "Equals",
          },
          mixin: {
            description: "@kcws/mixin package",
            title: "Mixin",
          },
          random: {
            description: "@kcws/random package",
            title: "Random",
          },
          "reset.css": {
            description: "@kcws/reset.css package",
            title: "Reset CSS",
          },
          "node-rig": {
            description: "@kcws/node-rig package",
            title: "Node Rig Package",
          },
          "web-rig": {
            description: "@kcws/web-rig package",
            title: "Web Rig Package",
          },
          "eslint-config": {
            description: "@kcws/eslint-config package",
            title: "Eslint config",
          },
          "lintstaged-config": {
            description: "@kcws/lintstaged-config package",
            title: "Lint-staged config",
          },
          types: {
            description: "All @types/* packages",
            title: "Typings",
          },
          "rush-api-documenter": {
            description: "rush-api-documenter autoinstaller",
            title: "Rush api-documenter",
          },
          "rush-commitlint": {
            description: "rush-commitlint autoinstaller",
            title: "Rush commitlint",
          },
          "rush-dependencies-updater": {
            description: "rush-dependencies-updater autoinstaller",
            title: "Rush dependencies-updater",
          },
          "rush-lintstaged": {
            description: "rush-lintstaged autoinstaller",
            title: "Rush lintstaged",
          },
          config: {
            description: "Monorepo configuration",
            title: "Configuration",
          },
        },
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      breakingBody: {
        description:
          "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
      },
      breaking: {
        description: "Describe the breaking changes",
      },
      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
      issuesBody: {
        description:
          "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};

module.exports = config;
