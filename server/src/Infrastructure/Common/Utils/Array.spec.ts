import { ArrayUtils } from './ArrayUtils';

describe('ArrayUtils', () => {
  it('testRange', async () => {
    const array = [...ArrayUtils.range(0, 10, 2)];
    const array2 = [...ArrayUtils.range(0, 10)];

    expect(array).toEqual([0, 2, 4, 6, 8, 10]);
    expect(array2).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
