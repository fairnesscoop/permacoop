import {mock, instance, when, verify} from 'ts-mockito';
import {DoesHolidayExistForPeriod} from './DoesHolidayExistForPeriod';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {HolidayRepository} from 'src/Infrastructure/HumanResource/Holiday/Repository/HolidayRepository';
import {Holiday, HolidayLeaveType} from '../Holiday.entity';

describe('DoesHolidayExistForPeriod', () => {
  let holidayRepository: HolidayRepository;
  let doesHolidayExistForPeriod: DoesHolidayExistForPeriod;
  const user = mock(User);
  const startDate = '2019-01-04';
  const endDate = '2019-01-06';

  beforeEach(() => {
    holidayRepository = mock(HolidayRepository);
    doesHolidayExistForPeriod = new DoesHolidayExistForPeriod(
      instance(holidayRepository)
    );
  });

  it('testHolidayAlreadyExistForThisPeriod', async () => {
    when(
      holidayRepository.findExistingHolidaysByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(
      new Holiday(
        instance(user),
        HolidayLeaveType.PAID,
        startDate,
        true,
        endDate,
        true,
        'H&M wedding'
      )
    );
    expect(
      await doesHolidayExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(true);
    verify(
      holidayRepository.findExistingHolidaysByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });

  it('testHolidayDoesntExistForThisPeriod', async () => {
    when(
      holidayRepository.findExistingHolidaysByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).thenResolve(null);
    expect(
      await doesHolidayExistForPeriod.isSatisfiedBy(
        instance(user),
        startDate,
        endDate
      )
    ).toBe(false);
    verify(
      holidayRepository.findExistingHolidaysByUserAndPeriod(
        instance(user),
        startDate,
        endDate
      )
    ).once();
  });
});
