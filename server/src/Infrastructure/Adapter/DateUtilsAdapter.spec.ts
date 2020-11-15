import { DateUtilsAdapter } from './DateUtilsAdapter';

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

  it('testGetCurrentDate', () => {
    const date = new Date('2020-05-09T11:49:58.706Z');
    const dateUtils = new DateUtilsAdapter(date);

    expect(dateUtils.getCurrentDate()).toBe(date);
    expect(dateUtils.getCurrentDateToISOString()).toBe(
      '2020-05-09T11:49:58.706Z'
    );
  });

  it('testGetWorkedDaysDuringAPeriod', () => {
    const startDate = new Date('2020-12-24');
    const endDate = new Date('2021-01-04');
    const dateUtils = new DateUtilsAdapter();

    expect(
      dateUtils.getWorkedDaysDuringAPeriod(startDate, endDate)
    ).toMatchObject([
      new Date('2020-12-24'),
      new Date('2020-12-28'),
      new Date('2020-12-29'),
      new Date('2020-12-30'),
      new Date('2020-12-31'),
      new Date('2021-01-04')
    ]);
  });

  it('testGetWorkedFreeDays', () => {
    const dateUtils = new DateUtilsAdapter();

    expect(dateUtils.getWorkedFreeDays(2020)).toMatchObject([
      new Date(`2020-01-01T00:00:00.000Z`),
      new Date(`2020-05-01T00:00:00.000Z`),
      new Date(`2020-05-08T00:00:00.000Z`),
      new Date(`2020-07-14T00:00:00.000Z`),
      new Date(`2020-08-15T00:00:00.000Z`),
      new Date(`2020-11-01T00:00:00.000Z`),
      new Date(`2020-11-11T00:00:00.000Z`),
      new Date(`2020-12-25T00:00:00.000Z`),
      new Date(`2020-04-13T00:00:00.000Z`),
      new Date(`2020-05-21T00:00:00.000Z`)
    ]);

    expect(dateUtils.getWorkedFreeDays(2021)).toMatchObject([
      new Date(`2021-01-01T00:00:00.000Z`),
      new Date(`2021-05-01T00:00:00.000Z`),
      new Date(`2021-05-08T00:00:00.000Z`),
      new Date(`2021-07-14T00:00:00.000Z`),
      new Date(`2021-08-15T00:00:00.000Z`),
      new Date(`2021-11-01T00:00:00.000Z`),
      new Date(`2021-11-11T00:00:00.000Z`),
      new Date(`2021-12-25T00:00:00.000Z`),
      new Date(`2021-04-05T00:00:00.000Z`),
      new Date(`2021-05-13T00:00:00.000Z`)
    ]);
  });

  it('testGetEasterDate', () => {
    const dateUtils = new DateUtilsAdapter();

    expect(dateUtils.getEasterDate(2020)).toMatchObject(
      new Date(`2020-04-12T00:00:00.000Z`)
    );
    expect(dateUtils.getEasterDate(2021)).toMatchObject(
      new Date(`2021-04-04T00:00:00.000Z`)
    );
    expect(dateUtils.getEasterDate(2022)).toMatchObject(
      new Date(`2022-04-17T00:00:00.000Z`)
    );
    expect(dateUtils.getEasterDate(2023)).toMatchObject(
      new Date(`2023-04-09T00:00:00.000Z`)
    );
  });

  it('testGetLeaveDuration', () => {
    const dateUtils = new DateUtilsAdapter();

    expect(dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', false)).toBe(
      7
    );
  });

  it('testGetMinimumLeaveDuration', () => {
    const dateUtils = new DateUtilsAdapter();

    expect(dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-05', false)).toBe(
      0.5
    );
  });
});
