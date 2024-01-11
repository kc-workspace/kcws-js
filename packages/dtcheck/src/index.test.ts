import {
  isArray,
  isBoolean,
  isFloat,
  isInteger,
  isNumber,
  isString,
  isObject,
  isFunction,
  isExist,
  isNotExist,
  isEmpty,
  isNotEmpty,
  isBigInteger,
  isSymbol,
} from ".";

describe("Index", () => {
  it("check exist", () => {
    expect(isExist("")).toEqual(true);
  });
  it("check not exist", () => {
    expect(isNotExist(undefined)).toEqual(true);
  });
  it("check empty", () => {
    expect(isEmpty([])).toEqual(true);
  });
  it("check not empty", () => {
    expect(isNotEmpty({ a: true })).toEqual(true);
  });
  it("check boolean", () => {
    expect(isBoolean(1)).toEqual(false);
  });
  it("check string", () => {
    expect(isString(true)).toEqual(false);
  });
  it("check integer", () => {
    expect(isInteger(5.55)).toEqual(false);
  });
  it("check float", () => {
    expect(isFloat(50)).toEqual(false);
  });
  it("check number", () => {
    expect(isNumber(9999)).toEqual(true);
  });
  it("check big integer", () => {
    expect(isBigInteger(123n)).toEqual(true);
  });
  it("check array", () => {
    expect(isArray([1, 2, 3])).toEqual(true);
  });
  it("check object", () => {
    expect(isObject({ hello: "world" })).toEqual(true);
  });
  it("check function", () => {
    expect(isFunction(new Function())).toEqual(true);
  });
  it("check symbol", () => {
    expect(isSymbol(Symbol(123))).toEqual(true);
  });
});
