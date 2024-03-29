<!-- Title section -->
<h1 align="center">
  Kamontat's Workspace for Js/Ts Ecosystem

  <img src="https://simpleicons.org/icons/javascript.svg" width="24px">
  <img src="https://simpleicons.org/icons/typescript.svg" width="24px">
  <img src="https://simpleicons.org/icons/nodedotjs.svg" width="24px">
</h1>

<!-- Description section -->
<p align="center">
  <strong>This monorepo included libraries, tools, and helpers that will make my life easier.</strong>
</p>

<!-- Badge setup -->
<p align="center">
  <a href="https://github.com/kc-workspace/kcws-js">
    <img src="https://img.shields.io/github/commit-activity/m/kc-workspace/kcws-js?style=flat-square" alt="Commit activity" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=kc-workspace_kcws-js">
    <img src="https://img.shields.io/sonar/quality_gate/kc-workspace_kcws-js/main?server=https%3A%2F%2Fsonarcloud.io&style=flat-square" alt="Quality gate" />
  </a>
  <a href="https://sonarcloud.io/project/issues?resolved=false&id=kc-workspace_kcws-js">
    <img src="https://img.shields.io/sonar/violations/kc-workspace_kcws-js/main?format=long&server=https%3A%2F%2Fsonarcloud.io&style=flat-square" alt="Violations" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=kc-workspace_kcws-js">
    <img src="https://img.shields.io/sonar/tech_debt/kc-workspace_kcws-js/main?server=https%3A%2F%2Fsonarcloud.io&style=flat-square" alt="Tech debt" />
  </a>
  <a href="https://sonarcloud.io/component_measures?metric=Coverage&view=list&id=kc-workspace_kcws-js">
    <img src="https://img.shields.io/sonar/coverage/kc-workspace_kcws-js/main?server=https%3A%2F%2Fsonarcloud.io&style=flat-square" alt="Code coverage" />
  </a>
  <a href="https://dashboard.mergify.com/github/kc-workspace/repo/kcws-js/queues">
  <img src="https://img.shields.io/endpoint?label=mergify&logo=-&style=flat-square&url=https%3A%2F%2Fapi.mergify.com%2Fv1%2Fbadges%2Fkc-workspace%2Fkcws-js" alt="Mergify status" />
  </a>
</p>

<!-- External section -->
<h3 align="center">
  <a href="https://js.kcws.kamontat.net">DOCUMENT</a>
  <span> · </span>
  <a href="https://sonarcloud.io/project/overview?id=kc-workspace_kcws-js">SONARCLOUD</a>
  <span> · </span>
  <a href="https://www.npmjs.com/org/kcws">NPM</a>
</h3>

## Prerequisite

1. Run `./scripts/prerequisite.sh` for checking current environment

## Everyday command

Below is a list of command you usually use to develop this repository.

### Install dependencies

`rush install` or `rush update`:
The main different between **install** and **update**
is the **install** won't update files and
throw if files requires to update ([more][everyday-commands-rush-update]).

### Build packages

`rush rebuild` or `rush build`: **Rebuild** will build every packages,
however **build** will build only changed package.

### Run package script

`rushx <script_name>`: This will provide better error report and
ensure **nodejs** and **pnpm** version by rush.

### Create git commit

`rush commit`: Create Git commit using commitizen configure as
conventional syntax.

### Create changesfile

> **Changesfile** is a changelog entry
> which later will use to create CHANGELOG file and
> bump version ([more][everyday-commands-rush-change])

`rush change [--commit]`: This will prompt to add changelog entry
and version type to bump. Add `--commit` to `git commit` as well.

### Check & Update dependencies

`rush upgrade [--interactive]`: Upgrade all outdated dependencies or
select via prompt using `--interactive` option. powered by [npm-check-updates][npm-check-updates-github]

[everyday-commands-rush-update]: https://rushjs.io/pages/developer/everyday_commands/#rush-update
[everyday-commands-rush-change]: https://rushjs.io/pages/developer/everyday_commands/#rush-change
[npm-check-updates-github]: https://github.com/raineorshine/npm-check-updates
