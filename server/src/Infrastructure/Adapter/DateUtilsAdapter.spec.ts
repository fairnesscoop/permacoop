import {DateUtilsAdapter} from './DateUtilsAdapter';

describe('DateUtilsAdapter', () => {
  it('testFormat', () => {
    const dateUtilsAdapter = new DateUtilsAdapter();
    expect(
      dateUtilsAdapter.format(new Date('2019-12-23T11:49:58.706Z'), 'y-MM-dd')
    ).toBe('2019-12-23');
  });

  it('testGetDaysInMonth', () => {
    const dateUtilsAdapter = new DateUtilsAdapter();
    expect(
      dateUtilsAdapter.getDaysInMonth(new Date('2019-12-23T11:49:58.706Z'))
    ).toBe(31);
    expect(
      dateUtilsAdapter.getDaysInMonth(new Date('2019-11-23T11:49:58.706Z'))
    ).toBe(30);
  });

  it('testIsWeekend', () => {
    const dateUtilsAdapter = new DateUtilsAdapter();
    expect(
      dateUtilsAdapter.isWeekend(new Date('2019-12-21T11:49:58.706Z'))
    ).toBe(true);
    expect(
      dateUtilsAdapter.isWeekend(new Date('2019-12-23T11:49:58.706Z'))
    ).toBe(false);
  });
});
