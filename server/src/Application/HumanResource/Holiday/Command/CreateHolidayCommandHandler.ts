import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {CreateHolidayCommand} from './CreateHolidayCommand';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {Holiday} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {DoesHolidayExistForPeriod} from 'src/Domain/HumanResource/Holiday/Specification/DoesHolidayExistForPeriod';
import {HolidayAlreadyExistForThisPeriodException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayAlreadyExistForThisPeriodException';
import {DoesEventsExistForPeriod} from 'src/Domain/FairCalendar/Specification/DoesEventsExistForPeriod';
import {EventsAlreadyExistForThisPeriodException} from 'src/Domain/FairCalendar/Exception/EventsAlreadyExistForThisPeriodException';

@CommandHandler(CreateHolidayCommand)
export class CreateHolidayCommandHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository,
    private readonly doesHolidayExistForPeriod: DoesHolidayExistForPeriod,
    private readonly doesEventsExistForPeriod: DoesEventsExistForPeriod
  ) {}

  public async execute(command: CreateHolidayCommand): Promise<string> {
    const {
      user,
      endDate,
      endsAllDay,
      leaveType,
      startDate,
      startsAllDay,
      comment
    } = command;

    if (
      true ===
      (await this.doesHolidayExistForPeriod.isSatisfiedBy(
        user,
        startDate,
        endDate
      ))
    ) {
      throw new HolidayAlreadyExistForThisPeriodException();
    }

    if (
      true ===
      (await this.doesEventsExistForPeriod.isSatisfiedBy(
        user,
        startDate,
        endDate
      ))
    ) {
      throw new EventsAlreadyExistForThisPeriodException();
    }

    const holiday = await this.holidayRepository.save(
      new Holiday(
        user,
        leaveType,
        startDate,
        startsAllDay,
        endDate,
        endsAllDay,
        comment
      )
    );

    return holiday.getId();
  }
}
