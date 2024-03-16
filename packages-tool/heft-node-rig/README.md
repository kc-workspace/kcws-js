# Heft node-rig

[![license@latest][img:license@latest]][link:license@latest]
[![npm@latest][img:npm@latest]][link:npm@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]

> Previous name was `@kcws/node-rig`

The riggable is a idea from heft cli to simplify building process
([learn more][link:heft-rigging]).

## Profiles

The profiles is a rigging profile to set up building process based on use cases.
On this package, contains 4 profiles:

- `library` - For both modern and legacy node libraries ([learn more](#profile-lib)).
- `library-js` - For javascript node libraries ([learn more](#profile-lib-js)).
- `application` - For both modern and legacy node applications ([learn more](#profile-app)).
- `application-js` - For javascript node applications ([learn more](#profile-app-js)).

### Profile lib

The `lib` output directory: **esm** if `type` is `module`;
otherwise, output target module will be **commonjs**.

### Profile lib js

### Profile app

### Profile app js


<!-- LINKS SECTION -->

[img:license@latest]: https://img.shields.io/npm/l/%40kcws%2Fheft-node-rig?style=flat-square
[link:license@latest]: ../../LICENSE

[img:npm@latest]: https://img.shields.io/npm/v/@kcws/heft-node-rig/latest?style=flat-square
[link:npm@latest]: https://www.npmjs.com/package/@kcws/heft-node-rig/v/latest

[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcws/heft-node-rig?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcws%2Fheft-node-rig

[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcws/heft-node-rig/latest?style=flat-square&label=size
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcws/heft-node-rig@latest

[link:heft-rigging]: https://heft.rushstack.io/pages/intro/rig_packages/

<!-- --------------------------------------------- -->
<!--                Legacy document                -->
<!-- --------------------------------------------- -->

## Typescript

Using `Typescript` module in heft to build and compile typescript
via [TypescriptTask][link:heft-ts] ([source][gh:heft-ts]).

- [tsconfig.json][local:tsconfig] - tsconfig used for compile project
- [typescript.json][local:ts-config] - custom typescript config used by heft for addition feature

### Output

This will generate output on multiple directories,

1. **lib** - a main directory contains compiled code.
  - `commonjs` (**.js**) - compiled code using commonjs type.
  - `esmodule` (**.mjs**) - compiled code using esmodule/es5 type.
  - `mapping` (**.js.map** or **.mjs.map**) - file mapping for commonjs or esmodule.
  - `typings` (**.d.ts**) - typescript definition created by `tsc` cli.
2. **dist** - a main typescript definition single file. it's separated to 4 files.
  - **index.d.ts** is a aggregated type of a project.
  - **index-alpha.d.ts** is a alpha-only type of a project.
  - **index-beta.d.ts** is a beta-only type of a project.
  - **index-public.d.ts** is a public-only type of a project.
3. **lib-umd** - a compiled [umd][umd-gh] code.

## Jest

Using [heft-jest-plugin][link:heft-jest] module to configure jest.
There are several config we overwritten to meet our need.

1. Enabled code coverage by default
2. Produce lcov report for **analysis code coverage** at [sonarcloud][link:sonarcloud]
3. Produce html report for test result using [jest-html-reporters][npm:jest-html]
4. Produce junit report for test result using [jest-junit][npm:jest-junit]

<!-- LINKS SECTION -->

[link:sonarcloud]: https://sonarcloud.io/
[link:heft-ts]: https://rushstack.io/pages/heft_tasks/typescript/
[link:heft-jest]: https://rushstack.io/pages/heft_tasks/jest/
[npm:jest-html]: https://www.npmjs.com/package/jest-html-reporters
[npm:jest-junit]: https://www.npmjs.com/package/jest-junit
[gh:heft-ts]: https://github.com/microsoft/rushstack/tree/576d198/apps/heft/src/plugins/TypeScriptPlugin

[local:tsconfig]: /packages/node-rig/profiles/default/tsconfig.base.json
[local:ts-config]: /packages/node-rig/profiles/default/config/typescript.json
