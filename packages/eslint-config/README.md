# Eslint-config

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
