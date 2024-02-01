import { getEqualFn } from ".";
import { defaultEqualFnMapper } from "../constants";

describe("Equals utilities", () => {
  it.each([
    ["string", undefined, defaultEqualFnMapper.string],
    ["number", undefined, defaultEqualFnMapper.number],
  ])("getEqualFn(%p, %p) should return %p", (datatype, mapper, expected) => {
    expect(getEqualFn<any>(datatype, mapper)).toEqual(expected);
  });

  it("getEqualFn throws exception when function not found", () => {
    expect(() => getEqualFn("hello")).toThrow(
      "Cannot find valid equal function of 'hello'"
    );
  });
});
