import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
import {IDateUtils} from 'src/Application/IDateUtils';
import {HolidayCantBeModeratedException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayCantBeModeratedException';
import {CanHolidayBeModerated} from 'src/Domain/HumanResource/Holiday/Specification/CanHolidayBeModerated';
import {AcceptHolidayCommand} from './AcceptHolidayCommand';
import {IEventBus} from 'src/Application/IEventBus';
import {AcceptedHolidayEvent} from '../Event/AcceptedHolidayEvent';
import {DoesEventsExistForPeriod} from 'src/Domain/FairCalendar/Specification/DoesEventsExistForPeriod';
import {EventsAlreadyExistForThisPeriodException} from 'src/Domain/FairCalendar/Exception/EventsAlreadyExistForThisPeriodException';

@CommandHandler(AcceptHolidayCommand)
export class AcceptHolidayCommandHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly canHolidayBeModerated: CanHolidayBeModerated,
    private readonly doesEventsExistForPeriod: DoesEventsExistForPeriod
  ) {}

  public async execute(command: AcceptHolidayCommand): Promise<string> {
    const {moderator, moderationComment, id} = command;

    const holiday = await this.holidayRepository.findOneDetailById(id);
    if (!holiday) {
      throw new HolidayNotFoundException();
    }

    if (
      false === this.canHolidayBeModerated.isSatisfiedBy(holiday, moderator)
    ) {
      throw new HolidayCantBeModeratedException();
    }

    if (
      true ===
      (await this.doesEventsExistForPeriod.isSatisfiedBy(
        holiday.getUser(),
        holiday.getStartDate(),
        holiday.getEndDate()
      ))
    ) {
      throw new EventsAlreadyExistForThisPeriodException();
    }

    holiday.accept(
      moderator,
      this.dateUtils.getCurrentDateToISOString(),
      moderationComment
    );

    await this.holidayRepository.save(holiday);
    this.eventBus.publish(new AcceptedHolidayEvent(holiday));

    return holiday.getId();
  }
}
