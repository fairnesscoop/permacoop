import { Inject } from '@nestjs/common';
import { FairCalendarView } from 'src/Application/FairCalendar/View/FairCalendarView';
import { CooperativeNotFoundException } from '../Settings/Repository/CooperativeNotFoundException';
import { ICooperativeRepository } from '../Settings/Repository/ICooperativeRepository';
import { ICalendarOverview } from './ICalendarOverview';

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
      mission: 0,
      dojo: 0,
      formationConference: 0,
      leave: 0,
      support: 0,
      other: 0
    };

    for (const { time, type: itemType } of items) {
      const type = itemType.startsWith('leave_') ? 'leave' : itemType;
      const days = time / cooperative.getDayDuration();

      overviewInDays[type] =
        Math.round((overviewInDays[type] + days) * 100) / 100;
    }

    return overviewInDays;
  }
}
