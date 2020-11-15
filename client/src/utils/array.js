export const range = function* (start, end, step = 1) {
  let i = start;

  while (i <= end) {
    yield i;
    i += step;
  }
};
