import {instance, mock} from 'ts-mockito';
import {Holiday, HolidayStatus, HolidayLeaveType} from './Holiday.entity';
import {User} from '../User/User.entity';

describe('Holiday.entity', () => {
  it('testGetters', () => {
    const user = mock(User);

    const holiday = new Holiday(
      instance(user),
      HolidayLeaveType.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );

    expect(holiday.getId()).toBe(undefined);
    expect(holiday.getUser()).toBe(instance(user));
    expect(holiday.getStartDate()).toBe('2019-01-04');
    expect(holiday.getEndDate()).toBe('2019-01-06');
    expect(holiday.getStatus()).toBe(HolidayStatus.WAITING);
    expect(holiday.getLeaveType()).toBe(HolidayLeaveType.PAID);
    expect(holiday.getComment()).toBe('H&M wedding');
    expect(holiday.isStartsAllDay()).toBe(true);
    expect(holiday.isEndsAllDay()).toBe(true);
  });
});
