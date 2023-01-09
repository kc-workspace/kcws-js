# Node-rig

[![npm@latest][img:npm@latest]][link:npm@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
![snyk@latest][img:snyk@latest]

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

[img:npm@latest]: https://img.shields.io/npm/v/@kcws/node-rig/latest?style=flat-square
[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcws/node-rig?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcws%2Fnode-rig
[link:npm@latest]: https://www.npmjs.com/package/@kcws/node-rig/v/latest
[img:snyk@latest]: https://img.shields.io/snyk/vulnerabilities/npm/@kcws/node-rig?style=flat-square
[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcws/node-rig/latest?style=flat-square
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcws/node-rig@latest

[link:sonarcloud]: https://sonarcloud.io/
[link:heft-ts]: https://rushstack.io/pages/heft_tasks/typescript/
[link:heft-jest]: https://rushstack.io/pages/heft_tasks/jest/
[npm:jest-html]: https://www.npmjs.com/package/jest-html-reporters
[npm:jest-junit]: https://www.npmjs.com/package/jest-junit
[gh:heft-ts]: https://github.com/microsoft/rushstack/tree/576d198/apps/heft/src/plugins/TypeScriptPlugin

[local:tsconfig]: /packages/node-rig/profiles/default/tsconfig.base.json
[local:ts-config]: /packages/node-rig/profiles/default/config/typescript.json
