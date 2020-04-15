import {Event} from './Event.entity';
import {IEventsOverview} from './IEventsOverview';

export class GetEventsOverview {
  public index(events: Event[]): IEventsOverview {
    const eventsByDate = [];
    const overview: IEventsOverview = {
      mission: 0,
      dojo: 0,
      formationConference: 0,
      holiday: 0,
      medicalLeave: 0,
      support: 0,
      workFree: 0,
      other: 0,
      mealTicket: 0,
      totalTimeSpent: 0
    };

    for (const event of events) {
      const dayIndex = new Date(event.getDate()).getDate() - 1;
      const time = event.getTime() / 100;
      const type = event.getType();

      if (eventsByDate[dayIndex]) {
        eventsByDate[dayIndex].push({time, type});
      } else {
        eventsByDate[dayIndex] = [{time, type}];
      }

      overview[event.getType()] += time;

      if (Event.WORKED_TYPES.includes(type)) {
        overview.totalTimeSpent += time;
      }
    }

    return this.calculateNumberOfMealTicket(
      overview,
      Object.values(eventsByDate)
    );
  }

  public calculateNumberOfMealTicket(
    overview: IEventsOverview,
    eventsByDate: any[]
  ): IEventsOverview {
    for (const sortedEvent of eventsByDate) {
      let totalPerDay = 0;

      for (const {time, type} of sortedEvent) {
        if (Event.WORKED_TYPES.includes(type)) {
          totalPerDay += time;
        }
      }

      if (totalPerDay > 0.5) {
        overview.mealTicket++;
      }
    }

    return overview;
  }
}
