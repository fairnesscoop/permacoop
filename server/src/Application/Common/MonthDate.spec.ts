import { MonthDate } from './MonthDate';

describe('MonthDate', () => {
  it('testFirstDayOfMonth', async () => {
    const month = new MonthDate(2022, 12);
    const firstDay = month.getFirstDay();
    expect(firstDay.toISOString()).toBe('2022-12-01T00:00:00.000Z');
  });

  it('testLastDayOfMonth', async () => {
    const month = new MonthDate(2022, 12);
    const lastDay = month.getLastDay();
    expect(lastDay.toISOString()).toBe('2022-12-31T00:00:00.000Z');
  });
});
