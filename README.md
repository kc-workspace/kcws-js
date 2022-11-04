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

<!-- Static badge setup -->
<p align="center">
  <a href="https://github.com/kc-workspace/kcws-js">
    <img src="https://img.shields.io/github/commit-activity/m/kc-workspace/kcws-js" alt="Commit activity" />
  </a>
</p>

<!-- External section -->
<h3 align="center">
  <a href="https://js.kcws.kamontat.net">Documentation</a>
  <span> · </span>
  <a href="https://sonarcloud.io/project/overview?id=kc-workspace_kcws-js">Sonarcloud</a>
</h3>

<!-- External section -->
<!-- <h3 align="center">
  <a href="docs/cicd.md">CI/CD</a>
  <span> · </span>
  <a href="docs/website.md">Website</a>
  <span> · </span>
  <a href="docs/quality.md">Quality</a>
  <span> · </span>
  <a href="docs/technology.md">Technology</a>
  <span> · </span>
  <a href="docs/known_issues.md">Known Issues</a>
  <span> · </span>
  <a href="docs/abtesting.md">AB Testing</a>
</h3> -->

## Prerequisite

1. Run `./scripts/prerequisite.sh` for checking current environment

## Everyday command

Below is a list of command you usually use to develop this repository.

### Install dependencies

`rush install` or `rush update`: The main different between **install** and **update** is won't update any files 
and failed if lock files need to change ([more][everyday-commands-rush-update]).

### Build packages

`rush rebuild` or `rush build`: **Rebuild** will build every packages, 
however **build** will build only changed package.

### Run package script

`rushx <script_name>`: This will provide better error report and 
ensure **nodejs** and **pnpm** version by rush.

### Create changesfile

> **Changesfile** is a change log entry which later will use to create CHANGELOG file and bump version ([more][everyday-commands-rush-change])

`rush change [--commit]`: This will prompt to add change log entry and version type to bump. Add `--commit` to `git commit` as well.

### Check & Update dependencies

`rush deps [--upgrade] [--interactive]`: Check dependencies need to upgrade
or add `--upgrade` to update package.json with latest version or select via prompt using `--interactive` option.

[everyday-commands-rush-update]: https://rushjs.io/pages/developer/everyday_commands/#rush-update
[everyday-commands-rush-change]: https://rushjs.io/pages/developer/everyday_commands/#rush-change
[npm-check-updates-github]: https://github.com/raineorshine/npm-check-updates
