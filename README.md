# Kamontat's Workspace for Javascript Ecosystem

This monorepo will include all libraries, tools, and helpers 
that will make my life easier.

## Get-start

1. Install `NodeJS` and `npm` (lts is required)
2. Install `Rush` as global package
3. `Rush` will do the rest

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
