/**
 * **addNum()**
 *
 * A utility to add two finite numbers
 *
 * @param a a finite number.
 * @param b a finite number.
 * @returns sum of a and b
 * @throws {RangeError} If either argument is NaN or not finite.
 */
export function addNum(a: number, b: number): number {
  // Check if arguments are non-numeric:
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("addNum(): arguments must be numbers");
  }

  // Check if arguments are invalid numbers:
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new RangeError("addNum(): arguments must be finite numbers");
  }

  // Return sum
  return a + b;
}
