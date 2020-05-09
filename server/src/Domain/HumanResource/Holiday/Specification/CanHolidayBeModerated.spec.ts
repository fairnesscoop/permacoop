import {mock, instance, when, verify} from 'ts-mockito';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Holiday, HolidayStatus} from '../Holiday.entity';
import {CanHolidayBeModerated} from './CanHolidayBeModerated';

describe('CanHolidayBeModerated', () => {
  let canHolidayBeModerated: CanHolidayBeModerated;
  const user = mock(User);
  const holiday = mock(Holiday);
  const moderator = mock(User);

  beforeEach(() => {
    canHolidayBeModerated = new CanHolidayBeModerated();
  });

  it('testHolidayCanBeRefused', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(moderator.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(holiday.getUser()).thenReturn(instance(user));
    when(holiday.getStatus()).thenReturn(HolidayStatus.PENDING);

    expect(
      await canHolidayBeModerated.isSatisfiedBy(
        instance(holiday),
        instance(moderator)
      )
    ).toBe(true);
  });

  it('testHolidayCantBeRefused', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(moderator.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(holiday.getUser()).thenReturn(instance(user));
    when(holiday.getStatus()).thenReturn(HolidayStatus.ACCEPTED);

    expect(
      await canHolidayBeModerated.isSatisfiedBy(
        instance(holiday),
        instance(moderator)
      )
    ).toBe(false);
  });
});
