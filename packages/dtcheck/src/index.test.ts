import { isArray, isObject, isExist, isNotExist } from ".";

describe("Index", () => {
  it("check exist", () => {
    expect(isExist("")).toEqual(true);
  });
  it("check not exist", () => {
    expect(isNotExist(undefined)).toEqual(true);
  });

  it("check array", () => {
    expect(isArray([1, 2, 3])).toEqual(true);
  });

  it("check object", () => {
    expect(isObject({ hello: "world" })).toEqual(true);
  });
});
