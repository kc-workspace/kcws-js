import { isNotExist } from "./exist";

const trueBigInt: bigint = BigInt(1);
const falseBigInt: bigint = BigInt(0);
const possibleBooleanStrings: Set<string> = new Set([
  "true",
  "false",
  "True",
  "False",
  "TRUE",
  "FALSE",
  "0",
  "1",
  "t",
  "f",
  "T",
  "F",
]);

const isLooseBoolean = (input: Optional<unknown>): input is boolean => {
  if (isNotExist(input)) return false;
  switch (typeof input) {
    case "boolean":
      return true;
    case "number":
      return input === 0 || input === 1;
    case "string":
      return possibleBooleanStrings.has(input);
    case "bigint":
      return input === trueBigInt || input === falseBigInt;
    case "symbol":
      return isLooseBoolean(input.toString());
    case "function":
      return isLooseBoolean(input());
    default:
      return false;
  }
};

const isStrictBoolean = (input: Optional<unknown>): input is boolean => {
  if (isNotExist(input)) return false;
  return typeof input === "boolean";
};

/**
 * check if input is boolean type (or boolean like when looseMode is true).
 *
 * @remarks
 *
 * Boolean like is when input might not be boolean type on javascript,
 * but it can convert to boolean pretty easy using \@kcws/dtconvert package.
 *
 * @param input - any input
 * @param looseMode - loose mode will check without consider data-type
 * @returns true if input is boolean type (or boolean like)
 *
 * @beta
 */
export const isBoolean = (
  input: Optional<unknown>,
  looseMode: boolean = false
): input is boolean => {
  if (looseMode) return isLooseBoolean(input);
  return isStrictBoolean(input);
};
