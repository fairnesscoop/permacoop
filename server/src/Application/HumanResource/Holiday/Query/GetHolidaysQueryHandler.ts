import {QueryHandler} from '@nestjs/cqrs';
import {GetHolidaysQuery} from './GetHolidaysQuery';
import {Inject} from '@nestjs/common';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {IDateUtils} from 'src/Application/IDateUtils';
import {HolidayView} from '../View/HolidayView';
import {UserSummaryView} from '../../User/View/UserSummaryView';
import {Pagination} from 'src/Application/Common/Pagination';

@QueryHandler(GetHolidaysQuery)
export class GetHolidaysQueryHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(
    query: GetHolidaysQuery
  ): Promise<Pagination<HolidayView>> {
    const holidayViews: HolidayView[] = [];
    const [holidays, total] = await this.holidayRepository.findHolidays(
      query.page
    );

    for (const holiday of holidays) {
      const user = holiday.getUser();
      let duration = this.dateUtils.getWorkedDaysDuringAPeriod(
        new Date(holiday.getStartDate()),
        new Date(holiday.getEndDate())
      ).length;

      if (false === holiday.isStartsAllDay()) {
        duration -= 0.5;
      }

      if (false === holiday.isEndsAllDay()) {
        duration -= 0.5;
      }

      holidayViews.push(
        new HolidayView(
          holiday.getId(),
          holiday.getLeaveType(),
          holiday.getStatus(),
          holiday.getStartDate(),
          holiday.getEndDate(),
          duration,
          new UserSummaryView(
            user.getId(),
            user.getFirstName(),
            user.getLastName()
          )
        )
      );
    }

    return new Pagination<HolidayView>(holidayViews, total);
  }
}
