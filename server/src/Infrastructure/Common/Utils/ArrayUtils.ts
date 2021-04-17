export class ArrayUtils {
  public static range(start: number, end: number, step: number = 1) {
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
}
