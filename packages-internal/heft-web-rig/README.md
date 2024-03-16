# Heft web-rig

[![license@latest][img:license@latest]][link:license@latest]
[![npm@latest][img:npm@latest]][link:npm@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]

> This packages is for internal usage only.

The riggable is a idea from heft cli to simplify building process
([learn more][link:heft-rigging]).

## Profiles

The profiles is a rigging profile to set up building process based on use cases.
On this package, contains 1 profile:

- `default` - For all web packages managed on this repository ([learn more](#profile-default)).
- `css` - For css packages managed on this repository ([learn more](#profile-default)).

### Profile default

This will generate multiple modules output listed below:

- `lib` - The base module contains `ESNext` module code
- `lib-commonjs` - contains `CommonJS` javascript code
- `lib-umd` - contains `UMD` module code
- `lib-css` - contains `css` files (if any)
- `dist` - contains aggregated typescript definitions
  - **index.d.ts** contains all exported types
  - **index-alpha.d.ts** contains only alpha exported types
  - **index-beta.d.ts** contains only beta exported types
  - **index-public.d.ts** contains only public exported types

This also support scss compiles to css with type definitions.

### Profile css

This for css packages (the npm package which contains only css/scss/sass files).
This will linting (using eslint) and compile to css with type definitions exported.

The output css should be in `lib` directory and
type definitions in `lib/types` directory.

<!-- LINKS SECTION -->

[img:license@latest]: https://img.shields.io/npm/l/%40kcinternals%2Fheft-web-rig?style=flat-square
[link:license@latest]: ../../LICENSE

[img:npm@latest]: https://img.shields.io/npm/v/@kcinternals/heft-web-rig/latest?style=flat-square
[link:npm@latest]: https://www.npmjs.com/package/@kcinternals/heft-web-rig/v/latest

[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcinternals/heft-web-rig?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcinternals%2Fheft-web-rig

[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcinternals/heft-web-rig/latest?style=flat-square&label=size
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcinternals/heft-web-rig@latest

[link:heft-rigging]: https://heft.rushstack.io/pages/intro/rig_packages/
