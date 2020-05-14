import {mock, instance, when, verify, anything, deepEqual} from 'ts-mockito';
import {AcceptHolidayCommandHandler} from './AcceptHolidayCommandHandler';
import {HolidayRepository} from 'src/Infrastructure/HumanResource/Holiday/Repository/HolidayRepository';
import {AcceptHolidayCommand} from './AcceptHolidayCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Holiday} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
import {HolidayCantBeModeratedException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayCantBeModeratedException';
import {CanHolidayBeModerated} from 'src/Domain/HumanResource/Holiday/Specification/CanHolidayBeModerated';
import {EventBusAdapter} from 'src/Infrastructure/Adapter/EventBusAdapter';
import {AcceptedHolidayEvent} from '../Event/AcceptedHolidayEvent';

describe('AcceptHolidayCommandHandler', () => {
  let holidayRepository: HolidayRepository;
  let eventBusAdapter: EventBusAdapter;
  let dateUtilsAdapter: DateUtilsAdapter;
  let canHolidayBeModerated: CanHolidayBeModerated;
  let handler: AcceptHolidayCommandHandler;

  const user = mock(User);
  const holiday = mock(Holiday);
  const command = new AcceptHolidayCommand(
    instance(user),
    'cfdd06eb-cd71-44b9-82c6-46110b30ce05',
    'Enjoy'
  );

  beforeEach(() => {
    holidayRepository = mock(HolidayRepository);
    eventBusAdapter = mock(EventBusAdapter);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    canHolidayBeModerated = mock(CanHolidayBeModerated);

    handler = new AcceptHolidayCommandHandler(
      instance(holidayRepository),
      instance(eventBusAdapter),
      instance(dateUtilsAdapter),
      instance(canHolidayBeModerated)
    );
  });

  it('testHolidayNotNotFound', async () => {
    when(
      holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(HolidayNotFoundException);
      expect(e.message).toBe('human_resource.errors.holiday_not_found');
      verify(
        holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(
        canHolidayBeModerated.isSatisfiedBy(anything(), anything())
      ).never();
      verify(holiday.accept(anything(), anything(), anything())).never();
      verify(eventBusAdapter.publish(anything())).never();
      verify(holidayRepository.save(anything())).never();
    }
  });

  it('testHolidayCantBeAccepted', async () => {
    when(
      holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(holiday));
    when(
      canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
    ).thenReturn(false);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(HolidayCantBeModeratedException);
      expect(e.message).toBe('human_resource.errors.holiday_cant_be_moderated');
      verify(
        canHolidayBeModerated.isSatisfiedBy(instance(holiday), instance(user))
      ).once();
      verify(
        holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(eventBusAdapter.publish(anything())).never();
      verify(holiday.accept(anything(), anything(), anything())).never();
      verify(holidayRepository.save(anything())).never();
    }
  });

  it('testHolidaySuccessfullyAccepted', async () => {
    when(holiday.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(
      holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(holiday));
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
      eventBusAdapter.publish(
        deepEqual(new AcceptedHolidayEvent(instance(holiday)))
      )
    ).once();
    verify(
      holidayRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).once();
    verify(
      holiday.accept(instance(user), '2020-09-10T00:00:00.000Z', 'Enjoy')
    ).once();
    verify(holidayRepository.save(instance(holiday))).once();
  });
});
