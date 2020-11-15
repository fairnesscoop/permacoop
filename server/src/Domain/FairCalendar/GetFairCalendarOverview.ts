import { Inject } from '@nestjs/common';
import { FairCalendarView } from 'src/Application/FairCalendar/View/FairCalendarView';
import { Cooperative } from '../Settings/Cooperative.entity';
import { CooperativeNotFoundException } from '../Settings/Repository/CooperativeNotFoundException';
import { ICooperativeRepository } from '../Settings/Repository/ICooperativeRepository';
import { EventType } from './Event.entity';
import { ICalendarOverview } from './ICalendarOverview';

export class GetFairCalendarOverview {
  constructor(
    @Inject('ICooperativeRepository')
    private readonly cooperativeRepository: ICooperativeRepository
  ) {}

  public async index(items: FairCalendarView[]): Promise<ICalendarOverview> {
    const cooperative = await this.cooperativeRepository.find();
    if (!cooperative) {
      throw new CooperativeNotFoundException();
    }

    const itemsByDate = [];
    const overviewInDays: ICalendarOverview = {
      mission: 0,
      dojo: 0,
      formationConference: 0,
      leave: 0,
      support: 0,
      other: 0,
      mealTicket: 0
    };

    for (const {date, time, type: itemType, project} of items) {
      const dayIndex = new Date(date).getDate() - 1;
      const type = itemType.startsWith('leave_') ? 'leave' : itemType;
      const dayDuration = project ? project.dayDuration : cooperative.getDayDuration();
      const hours = time / dayDuration;

      if (itemsByDate[dayIndex]) {
        itemsByDate[dayIndex].push({ time, type });
      } else {
        itemsByDate[dayIndex] = [{ time, type }];
      }

      overviewInDays[type] = Math.round((overviewInDays[type] + hours) * 100) / 100;
    }

    return {
      ...overviewInDays,
      mealTicket: this.calculateNumberOfMealTicketsByDate(cooperative, Object.values(itemsByDate))
    };
  }

  private calculateNumberOfMealTicketsByDate(cooperative: Cooperative, itemsByDate: any[]): number {
    let mealTicket = 0;

    for (const sortedEvent of itemsByDate) {
      let totalPerDay = 0;

      for (const { time, type } of sortedEvent) {
        if (type !== EventType.OTHER && 'leave' !== type) {
          totalPerDay += time;
        }
      }

      if (totalPerDay > (cooperative.getDayDuration() / 2)) {
        mealTicket++;
      }
    }

    return mealTicket;
  }
}
