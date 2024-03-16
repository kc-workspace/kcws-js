const ts = ["*.ts"];
const cts = ["*.cts"];
const mts = ["*.mts"];
const tsx = ["*.tsx"];
const dts = ["*.d.ts"];
const typescripts = [...ts, ...cts, ...mts, ...tsx];

const js = ["*.js"];
const cjs = ["*.cjs"];
const mjs = ["*.mjs"];
const jsx = ["*.jsx"];
const javascripts = [...js, ...cjs, ...mjs, ...jsx];

const tests = [
  // Test files
  "*.test.ts",
  "*.test.tsx",
  "*.test.js",
  "*.test.jsx",
  "*.spec.ts",
  "*.spec.tsx",
  "*.spec.js",
  "*.spec.jsx",

  // Facebook convention
  "**/__mocks__/*.ts",
  "**/__mocks__/*.tsx",
  "**/__mocks__/*.js",
  "**/__mocks__/*.jsx",
  "**/__tests__/*.ts",
  "**/__tests__/*.tsx",
  "**/__tests__/*.js",
  "**/__tests__/*.jsx",

  // Microsoft convention
  "**/test/*.ts",
  "**/test/*.tsx",
  "**/test/*.js",
  "**/test/*.jsx",
];

/**
 * merge all file languages together
 * @param  {...string[]} languages languages
 */
function lang(...languages) {
  return languages.flat();
}

module.exports = {
  lang,
  ts,
  cts,
  mts,
  tsx,
  dts,
  typescripts,
  js,
  cjs,
  mjs,
  jsx,
  javascripts,
  tests,
};
