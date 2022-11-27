import {
  lowerAlphabet,
  upperAlphabet,
  lowerAlphanumeric,
  upperAlphanumeric,
  numeric,
  alphanumeric,
} from "./whitelist";

describe("whitelist", () => {
  it.each([
    ["lowerAlphabet", lowerAlphabet, 26],
    ["upperAlphabet", upperAlphabet, 26],
    ["numeric", numeric, 10],
    ["lowerAlphanumeric", lowerAlphanumeric, 36],
    ["upperAlphanumeric", upperAlphanumeric, 36],
    ["alphanumeric", alphanumeric, 62],
  ])("%s should contains %s characters", (name, input, length) => {
    expect(name).not.toEqual("");
    expect(input.length).toEqual(length);
  });
});
