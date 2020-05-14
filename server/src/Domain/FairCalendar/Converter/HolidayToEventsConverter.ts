import {Inject} from '@nestjs/common';
import {
  Holiday,
  HolidayLeaveType
} from '../../HumanResource/Holiday/Holiday.entity';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {IEventRepository} from '../Repository/IEventRepository';
import {IDateUtils} from 'src/Application/IDateUtils';

export class HolidayToEventsConverter {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public convert(holiday: Holiday): void {
    const user = holiday.getUser();
    const dates = this.dateUtils.getWorkedDaysDuringAPeriod(
      new Date(holiday.getStartDate()),
      new Date(holiday.getEndDate())
    );

    if (!dates || 0 === dates.length) {
      return;
    }

    const firstDate = dates[0].toISOString();
    const lastDate = dates[dates.length - 1].toISOString();

    for (const date of dates) {
      this.eventRepository.save(
        new Event(
          this.getType(holiday),
          user,
          this.getTime(holiday, firstDate, lastDate, date.toISOString()),
          date.toISOString()
        )
      );
    }
  }

  private getTime(
    holiday: Holiday,
    firstDate: string,
    lastDate: string,
    currentDate: string
  ): number {
    return (firstDate === currentDate && false === holiday.isStartsAllDay()) ||
      (lastDate === currentDate && false === holiday.isEndsAllDay())
      ? 50
      : 100;
  }

  private getType(holiday: Holiday): EventType {
    return holiday.getLeaveType() === HolidayLeaveType.MEDICAL
      ? EventType.MEDICAL_LEAVE
      : EventType.HOLIDAY;
  }
}
