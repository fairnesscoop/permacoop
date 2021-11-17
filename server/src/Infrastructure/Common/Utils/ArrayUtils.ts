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

  public static flatMap<T, V>(items: T[], fn: (x: T) => V[]): V[] {
    const arr = [];
    for (let item of items) {
      arr.push(...fn(item));
    }
    return arr;
  }
}
