import { Inject } from '@nestjs/common';
import { FairCalendarView } from 'src/Application/FairCalendar/View/FairCalendarView';
import { CooperativeNotFoundException } from '../Settings/Repository/CooperativeNotFoundException';
import { ICooperativeRepository } from '../Settings/Repository/ICooperativeRepository';
import { ICalendarOverview } from './ICalendarOverview';
import { EventType } from './Event.entity';

export class FairCalendarOverviewFactory {
  constructor(
    @Inject('ICooperativeRepository')
    private readonly cooperativeRepository: ICooperativeRepository
  ) {}

  public async create(items: FairCalendarView[]): Promise<ICalendarOverview> {
    const cooperative = await this.cooperativeRepository.find();
    if (!cooperative) {
      throw new CooperativeNotFoundException();
    }

    const overviewInDays: ICalendarOverview = {
      mission: {
        days: 0,
        details: []
      },
      dojo: {
        days: 0
      },
      formationConference: {
        days: 0
      },
      leave: {
        days: 0
      },
      support: {
        days: 0
      },
      other: {
        days: 0
      }
    };

    for (const { time, type: itemType, project } of items) {
      const type = itemType.startsWith('leave_') ? 'leave' : itemType;
      const days = time / cooperative.getDayDuration();

      if (overviewInDays[type]) {
        overviewInDays[type].days =
          Math.round((overviewInDays[type].days + days) * 100) / 100;

        if (type === EventType.MISSION) {
          const missionDetail = overviewInDays[type].details.find(
            ({ label }) => label === project.name
          );

          if (missionDetail) {
            missionDetail.days =
              Math.round(
                (missionDetail.days + Math.round(days * 100) / 100) * 100
              ) / 100;
          } else {
            overviewInDays[type].details.push({
              days,
              label: project.name
            });
          }
        }
      }
    }

    return overviewInDays;
  }
}
