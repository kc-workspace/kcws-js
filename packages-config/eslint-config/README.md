# Eslint config

[![license@latest][img:license@latest]][link:license@latest]
[![npm@latest][img:npm@latest]][link:npm@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]

My personal reusable eslint configuration.

## Usage

1. Install this package via `npm install @kcws/eslint-config`
2. Create javascript eslint config at root (**.eslintrc.js**)
3. Place below code with customize settings

```js
const createConfig = require("@kcws/eslint-config");
module.exports = createConfig({
  cwd: __dirname,
  // your application profile
  profile: "web",
  // additional settings
  // ...
});
```

<!-- LINKS SECTION -->

[img:license@latest]: https://img.shields.io/npm/l/%40kcws%2Feslint-config?style=flat-square
[link:license@latest]: ../../LICENSE

[img:npm@latest]: https://img.shields.io/npm/v/@kcws/eslint-config/latest?style=flat-square
[link:npm@latest]: https://www.npmjs.com/package/@kcws/eslint-config/v/latest

[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcws/eslint-config?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcws%2Feslint-config

[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcws/eslint-config/latest?style=flat-square&label=size
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcws/eslint-config@latest
