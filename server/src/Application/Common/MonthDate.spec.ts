import { MonthDate } from './MonthDate';

describe('MonthDate', () => {
  it('testFirstDayOfMonth', async () => {
    const month = new MonthDate(2022, 12);
    const firstDay = month.getFirstDay();
    expect(firstDay.toISOString().substring(0, 10)).toBe('2022-12-01');
  });

  it('testLastDayOfMonth', async () => {
    const month = new MonthDate(2022, 12);
    const lastDay = month.getLastDay();
    expect(lastDay.toISOString().substring(0, 10)).toBe('2022-12-31');
  });
});
