import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {DoesHolidayExistForPeriod} from 'src/Domain/HumanResource/Holiday/Specification/DoesHolidayExistForPeriod';
import {CreateHolidayCommandHandler} from './CreateHolidayCommandHandler';
import {HolidayRepository} from 'src/Infrastructure/HumanResource/Holiday/Repository/HolidayRepository';
import {CreateHolidayCommand} from './CreateHolidayCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {
  HolidayLeaveType,
  Holiday
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {HolidayAlreadyExistForThisPeriodException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayAlreadyExistForThisPeriodException';

describe('CreateHolidayCommandHandler', () => {
  let holidayRepository: HolidayRepository;
  let doesHolidayExistForPeriod: DoesHolidayExistForPeriod;
  let handler: CreateHolidayCommandHandler;

  const user = mock(User);
  const command = new CreateHolidayCommand(
    instance(user),
    HolidayLeaveType.PAID,
    '2019-01-04',
    true,
    '2019-01-06',
    true,
    'H&M wedding'
  );

  beforeEach(() => {
    holidayRepository = mock(HolidayRepository);
    doesHolidayExistForPeriod = mock(DoesHolidayExistForPeriod);

    handler = new CreateHolidayCommandHandler(
      instance(holidayRepository),
      instance(doesHolidayExistForPeriod)
    );
  });

  it('testHolidayAlreadyExist', async () => {
    when(
      doesHolidayExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(HolidayAlreadyExistForThisPeriodException);
      expect(e.message).toBe(
        'human_resource.errors.holiday_already_exist_for_this_period'
      );
      verify(
        doesHolidayExistForPeriod.isSatisfiedBy(
          instance(user),
          '2019-01-04',
          '2019-01-06'
        )
      ).once();
      verify(holidayRepository.save(anything())).never();
    }
  });

  it('testCreateHolidaysSuccessfully', async () => {
    const holiday = mock(Holiday);
    when(holiday.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');

    when(
      doesHolidayExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).thenResolve(false);

    when(
      holidayRepository.save(
        deepEqual(
          new Holiday(
            instance(user),
            HolidayLeaveType.PAID,
            '2019-01-04',
            true,
            '2019-01-06',
            true,
            'H&M wedding'
          )
        )
      )
    ).thenResolve(instance(holiday));

    expect(await handler.execute(command)).toBe(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    verify(
      doesHolidayExistForPeriod.isSatisfiedBy(
        instance(user),
        '2019-01-04',
        '2019-01-06'
      )
    ).once();
    verify(
      holidayRepository.save(
        deepEqual(
          new Holiday(
            instance(user),
            HolidayLeaveType.PAID,
            '2019-01-04',
            true,
            '2019-01-06',
            true,
            'H&M wedding'
          )
        )
      )
    ).once();
  });
});
