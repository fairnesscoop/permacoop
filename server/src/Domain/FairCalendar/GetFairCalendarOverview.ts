import { Type } from '../HumanResource/Leave/LeaveRequest.entity';
import { EventType } from './Event.entity';
import { ICalendar } from './ICalendar';
import { ICalendarOverview } from './ICalendarOverview';

export class GetFairCalendarOverview {
  public index(items: ICalendar[]): ICalendarOverview {
    const itemsByDate = [];
    const overview: ICalendarOverview = {
      mission: 0,
      dojo: 0,
      formationConference: 0,
      leave: 0,
      support: 0,
      other: 0,
      mealTicket: 0
    };

    for (const item of items) {
      const dayIndex = new Date(item.getDate()).getDate() - 1;
      const time = item.getTime() / 100;
      const type = item.getType().startsWith('leave_') ? 'leave' : item.getType();

      if (itemsByDate[dayIndex]) {
        itemsByDate[dayIndex].push({ time, type });
      } else {
        itemsByDate[dayIndex] = [{ time, type }];
      }

      overview[type] += time;
    }

    return {
      ...overview,
      mealTicket: this.getNumberOfMealTickets(Object.values(itemsByDate))
    };
  }

  public getNumberOfMealTickets(itemsByDate: any[]): number {
    let mealTicket = 0;

    for (const sortedEvent of itemsByDate) {
      let totalPerDay = 0;

      for (const { time, type } of sortedEvent) {
        if (type !== EventType.OTHER && 'leave' !== type) {
          totalPerDay += time;
        }
      }

      if (totalPerDay > 0.5) {
        mealTicket++;
      }
    }

    return mealTicket;
  }
}
