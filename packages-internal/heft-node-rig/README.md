# Heft node-rig

[![license@latest][img:license@latest]][link:license@latest]
[![npm@latest][img:npm@latest]][link:npm@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]

> This packages is for internal usage only.

The riggable is a idea from heft cli to simplify building process
([learn more][link:heft-rigging]).

## Profiles

The profiles is a rigging profile to set up building process based on use cases.
On this package, contains 2 profiles:

- `default` - For all typescript node packages managed on this repository ([learn more](#profile-default)).
- `js` - For all javascript node packages managed on this repository ([learn more](#profile-js)).

### Profile default

This will generate multiple modules output listed below:

- `lib` - The base module contains `CommonJS` javascript code
- `lib-esnext` - contains `ESNext` module code
- `dist` - contains aggregated typescript definitions
  - **index.d.ts** contains all exported types
  - **index-alpha.d.ts** contains only alpha exported types
  - **index-beta.d.ts** contains only beta exported types
  - **index-public.d.ts** contains only public exported types

### Profile js

Similar to default profile except below:

- Output only CommonJS on `lib` directory
- Support typings on jsdoc instead of typescript

<!-- LINKS SECTION -->

[img:license@latest]: https://img.shields.io/npm/l/%40kcinternals%2Fheft-node-rig?style=flat-square
[link:license@latest]: ../../LICENSE

[img:npm@latest]: https://img.shields.io/npm/v/@kcinternals/heft-node-rig/latest?style=flat-square
[link:npm@latest]: https://www.npmjs.com/package/@kcinternals/heft-node-rig/v/latest

[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcinternals/heft-node-rig?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcinternals%2Fheft-node-rig

[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcinternals/heft-node-rig/latest?style=flat-square&label=size
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcinternals/heft-node-rig@latest

[link:heft-rigging]: https://heft.rushstack.io/pages/intro/rig_packages/
