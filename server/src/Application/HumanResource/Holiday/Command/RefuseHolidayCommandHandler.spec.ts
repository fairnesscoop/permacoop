import {mock, instance, when, verify, anything} from 'ts-mockito';
import {RefuseHolidayCommandHandler} from './RefuseHolidayCommandHandler';
import {HolidayRepository} from 'src/Infrastructure/HumanResource/Holiday/Repository/HolidayRepository';
import {RefuseHolidayCommand} from './RefuseHolidayCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Holiday} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
import {HolidayCantBeModeratedException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayCantBeModeratedException';
import {CanHolidayBeModerated} from 'src/Domain/HumanResource/Holiday/Specification/CanHolidayBeModerated';

describe('RefuseHolidayCommandHandler', () => {
  let holidayRepository: HolidayRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let canHolidayBeModerated: CanHolidayBeModerated;
  let handler: RefuseHolidayCommandHandler;

  const user = mock(User);
  const holiday = mock(Holiday);
  const command = new RefuseHolidayCommand(
    instance(user),
    'cfdd06eb-cd71-44b9-82c6-46110b30ce05',
    'Bad period'
  );

  beforeEach(() => {
    holidayRepository = mock(HolidayRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    canHolidayBeModerated = mock(CanHolidayBeModerated);

    handler = new RefuseHolidayCommandHandler(
      instance(holidayRepository),
      instance(dateUtilsAdapter),
      instance(canHolidayBeModerated)
    );
  });

  it('testHolidayNotNotFound', async () => {
    when(
      holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(HolidayNotFoundException);
      expect(e.message).toBe('human_resources.holidays.errors.not_found');
      verify(
        holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(
        canHolidayBeModerated.isSatisfiedBy(anything(), anything())
      ).never();
      verify(holiday.refuse(anything(), anything(), anything())).never();
      verify(holidayRepository.save(anything())).never();
    }
  });

  it('testHolidayCantBeRefused', async () => {
    when(
      holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(holiday));
    when(
      canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
    ).thenReturn(false);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(HolidayCantBeModeratedException);
      expect(e.message).toBe('human_resources.holidays.errors.cant_be_moderated');
      verify(
        canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
      ).once();
      verify(
        holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(holiday.refuse(anything(), anything(), anything())).never();
      verify(holidayRepository.save(anything())).never();
    }
  });

  it('testHolidaySuccessfullyRefused', async () => {
    when(
      holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(holiday));
    when(holiday.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(
      canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
    ).thenReturn(true);
    when(dateUtilsAdapter.getCurrentDateToISOString()).thenReturn(
      '2020-09-10T00:00:00.000Z'
    );

    expect(await handler.execute(command)).toBe(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    verify(
      canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
    ).once();
    verify(
      holidayRepository.findOneDetailById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).once();
    verify(
      holiday.refuse(instance(user), '2020-09-10T00:00:00.000Z', 'Bad period')
    ).calledBefore(holidayRepository.save(instance(holiday)));
    verify(holidayRepository.save(instance(holiday))).once();
  });
});
