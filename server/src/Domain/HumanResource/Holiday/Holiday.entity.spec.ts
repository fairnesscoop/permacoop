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
    expect(holiday.getStatus()).toBe(HolidayStatus.PENDING);
    expect(holiday.getLeaveType()).toBe(HolidayLeaveType.PAID);
    expect(holiday.getComment()).toBe('H&M wedding');
    expect(holiday.isStartsAllDay()).toBe(true);
    expect(holiday.isEndsAllDay()).toBe(true);
  });

  it('testRefuse', () => {
    const user = mock(User);
    const user2 = mock(User);

    const holiday = new Holiday(
      instance(user),
      HolidayLeaveType.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );
    holiday.refuse(instance(user2), '2020-01-01', 'Too much holidays');

    expect(holiday.getId()).toBe(undefined);
    expect(holiday.getUser()).toBe(instance(user));
    expect(holiday.getStartDate()).toBe('2019-01-04');
    expect(holiday.getEndDate()).toBe('2019-01-06');
    expect(holiday.getStatus()).toBe(HolidayStatus.REFUSED);
    expect(holiday.getLeaveType()).toBe(HolidayLeaveType.PAID);
    expect(holiday.getComment()).toBe('H&M wedding');
    expect(holiday.isStartsAllDay()).toBe(true);
    expect(holiday.isEndsAllDay()).toBe(true);
    expect(holiday.getModerator()).toBe(instance(user2));
    expect(holiday.getModerateAt()).toBe('2020-01-01');
    expect(holiday.getModerationComment()).toBe('Too much holidays');
  });

  it('testAccept', () => {
    const user = mock(User);
    const user2 = mock(User);

    const holiday = new Holiday(
      instance(user),
      HolidayLeaveType.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );
    holiday.accept(instance(user2), '2020-01-01', 'Enjoy');

    expect(holiday.getId()).toBe(undefined);
    expect(holiday.getUser()).toBe(instance(user));
    expect(holiday.getStartDate()).toBe('2019-01-04');
    expect(holiday.getEndDate()).toBe('2019-01-06');
    expect(holiday.getStatus()).toBe(HolidayStatus.ACCEPTED);
    expect(holiday.getLeaveType()).toBe(HolidayLeaveType.PAID);
    expect(holiday.getComment()).toBe('H&M wedding');
    expect(holiday.isStartsAllDay()).toBe(true);
    expect(holiday.isEndsAllDay()).toBe(true);
    expect(holiday.getModerator()).toBe(instance(user2));
    expect(holiday.getModerateAt()).toBe('2020-01-01');
    expect(holiday.getModerationComment()).toBe('Enjoy');
  });
});
