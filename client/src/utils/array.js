export const range = (from, to, step = 1, offset = 0) => (
  [...Array(to).keys()]
    .map((i) => (i + 1) * step + offset)
    .filter((i) => Boolean(i >= from && i <= to))
);
