import { addNum } from "../add";

describe("addNum() throws TypeError", () => {
  const NON_NUMERIC_CASES = [
    {
      arg1: "1",
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: "2",
    },
    {
      arg1: "1",
      arg2: "2",
    },
    {
      arg1: null,
      arg2: null,
    },
    {
      arg1: 1,
      arg2: null,
    },
    {
      arg1: null,
      arg2: 2,
    },
    {
      arg1: undefined,
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: undefined,
    },
    {
      arg1: undefined,
      arg2: undefined,
    },
    {
      arg1: null,
      arg2: undefined,
    },
    {
      arg1: true,
      arg2: 2,
    },
    {
      arg1: false,
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: true,
    },
    {
      arg1: 1,
      arg2: false,
    },
    {
      arg1: true,
      arg2: true,
    },
    {
      arg1: true,
      arg2: false,
    },
    {
      arg1: [],
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: [],
    },
    {
      arg1: [],
      arg2: [],
    },
    {
      arg1: [1],
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: [2],
    },
    {
      arg1: [1],
      arg2: [2],
    },
    {
      arg1: 1,
      arg2: {},
    },
    {
      arg1: {},
      arg2: 2,
    },
    {
      arg1: {},
      arg2: {},
    },
  ] as const;

  NON_NUMERIC_CASES.forEach((tCase) => {
    it(`Should throw TypeError for non-numeric arguments a:${tCase.arg1} b:${tCase.arg2}`, () => {
      expect(() => {
        return addNum(
          tCase.arg1 as unknown as number,
          tCase.arg2 as unknown as number,
        );
      }).toThrow(new TypeError("addNum(): arguments must be numbers"));
    });
  });
});

describe("addNum() throws RangeError", () => {
  const OUT_OF_RANGE_NUMBERS = [
    {
      arg1: Infinity,
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: Infinity,
    },
    {
      arg1: Infinity,
      arg2: Infinity,
    },
    {
      arg1: -Infinity,
      arg2: 2,
    },
    {
      arg1: 1,
      arg2: -Infinity,
    },
    {
      arg1: -Infinity,
      arg2: -Infinity,
    },
    {
      arg1: 1,
      arg2: NaN,
    },
    {
      arg1: NaN,
      arg2: 2,
    },
    {
      arg1: NaN,
      arg2: NaN,
    },
  ] as const;

  OUT_OF_RANGE_NUMBERS.forEach((tCase) => {
    it(`Should throw TypeError for non-numeric arguments a:${tCase.arg1} b:${tCase.arg2}`, () => {
      expect(() => {
        return addNum(
          tCase.arg1 as unknown as number,
          tCase.arg2 as unknown as number,
        );
      }).toThrow(new RangeError("addNum(): arguments must be finite numbers"));
    });
  });
});

describe("addNum() returns sum", () => {
  const NUMERIC_POS_NUMBERS = [
    { arg1: 1, arg2: 2, result: 3 },
    { arg1: 2, arg2: 1, result: 3 },
    { arg1: 1, arg2: 1, result: 2 },
    { arg1: 0, arg2: 1, result: 1 },
    { arg1: 1, arg2: 0, result: 1 },
    { arg1: 0, arg2: 0, result: 0 },
  ] as const;

  NUMERIC_POS_NUMBERS.forEach((tCase) => {
    it(`Should add valid positive numbers a:${tCase.arg1} b:${tCase.arg2} return:${tCase.result}`, () => {
      expect(addNum(tCase.arg1, tCase.arg2)).toBe(tCase.result);
    });
  });

  const NUMERIC_NEG_NUMBERS = [
    { arg1: -1, arg2: 2, result: 1 },
    { arg1: -1, arg2: -2, result: -3 },
    { arg1: -2, arg2: 1, result: -1 },
    { arg1: -1, arg2: 1, result: 0 },
    { arg1: 0, arg2: -1, result: -1 },
    { arg1: -1, arg2: 0, result: -1 },
  ] as const;

  NUMERIC_NEG_NUMBERS.forEach((tCase) => {
    it(`Should add valid negative numbers a:${tCase.arg1} b:${tCase.arg2} return:${tCase.result}`, () => {
      expect(addNum(tCase.arg1, tCase.arg2)).toBe(tCase.result);
    });
  });
});
