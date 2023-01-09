# Eslint-config

[![npm@latest][img:npm@latest]][link:npm@latest]
[![bundle@latest][img:bundle@latest]][link:bundle@latest]
[![libsio@latest][img:libsio@latest]][link:libsio@latest]
![snyk@latest][img:snyk@latest]

This is `kc` eslint config extends from rushstack configuration.
This contains multiple configuration called profile.

## Usage

1. Install this package via `npm install @kcws/eslint-config`
2. Create javascript eslint config at root (**.eslintrc.js**)
3. Select your profile and place to extends field

```js
module.exports = {
  extends: ["@kcws/eslint-config/profiles/<profile_name>"],
};
```

### Profiles

1. `node` - for node application, you need to add `parserOptions`
2. `web` - for website application, you need to add `parserOptions`

```js
module.exports = {
  extends: ["@kcws/eslint-config/profiles/node"],
  // Where tsconfigRootDir should path
  // to your tsconfig.json directory
  parserOptions: { tsconfigRootDir: __dirname },
};
```

3. `types` - for typing package (`@types/*`).

```js
module.exports = {
  extends: ["@kcws/eslint-config/profiles/types"],
};
```

<!-- LINKS SECTION -->

[img:npm@latest]: https://img.shields.io/npm/v/@kcws/eslint-config/latest?style=flat-square
[img:libsio@latest]: https://img.shields.io/librariesio/release/npm/@kcws/eslint-config?style=flat-square
[link:libsio@latest]: https://libraries.io/npm/@kcws%2Feslint-config
[link:npm@latest]: https://www.npmjs.com/package/@kcws/eslint-config/v/latest
[img:snyk@latest]: https://img.shields.io/snyk/vulnerabilities/npm/@kcws/eslint-config?style=flat-square
[img:bundle@latest]: https://img.shields.io/bundlephobia/min/@kcws/eslint-config/latest?style=flat-square
[link:bundle@latest]: https://bundlephobia.com/result?p=@kcws/eslint-config@latest
