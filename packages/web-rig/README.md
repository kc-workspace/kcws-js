# Web-rig

## Typescript

Using `Typescript` module to build and compile typescript
via [TypescriptTask][h-ts-pg] ([source][h-ts-pg-gh]) of heft cli.

### Output

By default [tsconfig][tsconfig] will always produce **./lib** directory with
ESNext javascript and types. However, we configure TypescriptTask
to also produce **commonjs**, **es6**, **amd**
and **umd** ([source][ts-config]).

## Jest

Using [heft-jest-plugin][h-j-pg] module to configure jest.
There are several config we overwritten to meet our need.

1. Enabled code coverage by default
2. Produce lcov report for **analysis code coverage** at [sonarcloud][sonarcloud]
3. Produce html report for test result using [jest-html-reporters][j-html-npm]
4. Produce junit report for test result using [jest-junit][j-junit-npm]

## Scss

> We didn't test this yet, it may or may not works as we expected

Using [heft-sass-plugin][h-scss-pg] module to generate css and
build type definition.

<!-- Links -->

[sonarcloud]: https://sonarcloud.io/

[h-ts-pg]: https://rushstack.io/pages/heft_tasks/typescript/
[h-j-pg]: https://rushstack.io/pages/heft_tasks/jest/
[h-scss-pg]: https://rushstack.io/pages/heft_tasks/sass-typings/

[h-ts-pg-gh]: https://github.com/microsoft/rushstack/tree/576d198/apps/heft/src/plugins/TypeScriptPlugin

[j-html-npm]: https://www.npmjs.com/package/jest-html-reporters
[j-junit-npm]: https://www.npmjs.com/package/jest-junit

[tsconfig]: /packages/node-rig/profiles/default/tsconfig.base.json
[ts-config]: /packages/node-rig/profiles/default/config/typescript.json
