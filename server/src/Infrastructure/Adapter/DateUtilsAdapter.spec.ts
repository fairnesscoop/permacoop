import {DateUtilsAdapter} from './DateUtilsAdapter';

describe('DateUtilsAdapter', () => {
  it('testFormat', () => {
    const dateUtils = new DateUtilsAdapter();
    expect(
      dateUtils.format(new Date('2019-12-23T11:49:58.706Z'), 'y-MM-dd')
    ).toBe('2019-12-23');
  });

  it('testGetDaysInMonth', () => {
    const dateUtils = new DateUtilsAdapter();
    expect(dateUtils.getDaysInMonth(new Date('2019-12-23T11:49:58.706Z'))).toBe(
      31
    );
    expect(dateUtils.getDaysInMonth(new Date('2019-11-23T11:49:58.706Z'))).toBe(
      30
    );
  });

  it('testIsWeekend', () => {
    const dateUtils = new DateUtilsAdapter();
    expect(dateUtils.isWeekend(new Date('2019-12-21T11:49:58.706Z'))).toBe(
      true
    );
    expect(dateUtils.isWeekend(new Date('2019-12-23T11:49:58.706Z'))).toBe(
      false
    );
  });
});
