/**
 * List of alphabet on lower case.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const lowerAlphabet: Array<string> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/**
 * List of alphabet on upper case.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const upperAlphabet: Array<string> = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 * List of number from 0-9.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const numeric: Array<string> = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

/**
 * List of alphabet on lower case + number from 0-9.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const lowerAlphanumeric: Array<string> = lowerAlphabet.concat(numeric);
/**
 * List of alphabet on upper case + number from 0-9.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const upperAlphanumeric: Array<string> = upperAlphabet.concat(numeric);
/**
 * List of alphabet on all cases + number from 0-9.
 * This can use as whitelist array on random option.
 *
 * @public
 */
export const alphanumeric: Array<string> = lowerAlphabet
  .concat(upperAlphabet)
  .concat(numeric);
