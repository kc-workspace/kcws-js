import { alphanumeric } from "../constants/whitelist";
import {
  RandomDynamicStringOption,
  RandomFixedStringOption,
  RandomFloatOption,
  RandomIntOption,
  RandomNumberOption,
} from "../models/IOptions";

const toInt = (i: number): number => Math.floor(i);

const onlyBetween = (i: number, min: number, max: number): number =>
  Math.min(Math.max(i, min), max);

export const getRandomIntOption = (
  input?: Partial<RandomIntOption>
): RandomIntOption => {
  return {
    min: toInt(input?.min ?? 0),
    max: toInt(input?.max ?? 10),
    maxInclusive: input?.maxInclusive ?? false,
  };
};

export const getRandomFloatOption = (
  input?: Partial<RandomFloatOption>
): RandomFloatOption => {
  return {
    min: input?.min ?? 0,
    max: input?.max ?? 1,
  };
};

export const getRandomNumberOption = (
  input?: Partial<RandomNumberOption>
): RandomNumberOption => {
  const integerMode = input?.integerMode ?? false;
  if (integerMode) {
    return {
      ...getRandomIntOption(input),
      integerMode,
    };
  } else {
    return {
      ...getRandomFloatOption(input),
      maxInclusive: false,
      integerMode,
    };
  }
};

export const getRandomFixedStringOption = (
  input?: Partial<RandomFixedStringOption>
): RandomFixedStringOption => {
  const whitelist = input?.whitelist ?? alphanumeric;
  return {
    length: toInt(onlyBetween(input?.length ?? 10, 1, whitelist.length)),
    whitelist,
  };
};

export const getRandomDynamicStringOption = (
  input?: Partial<RandomDynamicStringOption>
): RandomDynamicStringOption => {
  const whitelist = input?.whitelist ?? alphanumeric;
  const min = toInt(onlyBetween(input?.min ?? 1, 1, whitelist.length));
  const max = toInt(onlyBetween(input?.max ?? 100, 1, whitelist.length));

  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
    maxInclusive: input?.maxInclusive ?? false,
    whitelist,
  };
};
