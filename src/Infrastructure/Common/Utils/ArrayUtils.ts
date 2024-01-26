export class ArrayUtils {
  public static range(start: number, end: number, step = 1) {
    function* generateRange() {
      let x = start - step;
      while (x <= end - step) {
        yield (x += step);
      }
    }

    return {
      [Symbol.iterator]: generateRange
    };
  }

  public static zip<T, U>(left: T[], right: U[]): [T, U][] {
    return left.map((value, idx) => [value, right[idx]]);
  }

  public static groupBy<T>(
    xs: Array<T>,
    key: (x: T) => string
  ): { [key: string]: T } {
    // Credit: https://stackoverflow.com/a/34890276
    return xs.reduce(function(rv, x) {
      (rv[key(x)] = rv[key(x)] || []).push(x);
      return rv;
    }, {});
  }
}
