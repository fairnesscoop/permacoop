import {
  Controller,
  Get,
  Inject,
  Query,
  Render,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { GetMonthlyFairCalendarQuery } from 'src/Application/FairCalendar/Query/GetMonthlyFairCalendarQuery';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { FairCalendarControllerDTO } from '../DTO/FairCalendarControllerDTO';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';
import { minutesToHours } from 'src/Infrastructure/Common/Utils/dateUtils';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';
import { FairCalendarView } from 'src/Application/FairCalendar/View/FairCalendarView';
import { FairCalendarOverviewFactory } from 'src/Domain/FairCalendar/FairCalendarOverviewFactory';
import { FairCalendarOverviewTableFactory } from '../Table/FairCalendarOverviewTableFactory';
import { IDateUtils } from 'src/Application/IDateUtils';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

@Controller('app/faircalendar')
@UseGuards(IsAuthenticatedGuard)
export class FairCalendarController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    @Inject('ITranslator')
    private readonly translator: ITranslator,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private overviewFactory: FairCalendarOverviewFactory,
    private overviewTableFactory: FairCalendarOverviewTableFactory,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('faircalendar_index')
  @Render('pages/faircalendar/index.njk')
  public async get(
    @Query() dto: FairCalendarControllerDTO,
    @LoggedUser() user: User,
    @Req() req: Request
  ) {
    let date = new Date();

    if (dto.year !== undefined && dto.month !== undefined) {
      date = new Date(dto.year, dto.month - 1, 15);
    }

    const userId = dto.userId ? dto.userId : user['id'];

    const users: UserView[] = await this.queryBus.execute(
      new GetUsersQuery(false, true)
    );

    const events: FairCalendarView[] = await this.queryBus.execute(
      new GetMonthlyFairCalendarQuery(date, userId)
    );

    const overview = await this.overviewFactory.create(events);
    const overviewTable = this.overviewTableFactory.create(overview);

    const fullCalendarEvents = events.map(event => {
      let title = `${minutesToHours(event.time)} - `;

      const fcEventType = event.type.startsWith('leave_')
        ? 'leave'
        : event.type;

      if (fcEventType === 'mission' && event.task && event.project) {
        title += `${event.project.name} (${event.task.name})`;
      } else if (fcEventType === 'leave') {
        title += `${this.translator.translate('leaves-type-value', {
          type: event.type.slice(6)
        })}`;
      } else {
        title += `${this.translator.translate('faircalendar-type-option', {
          type: event.type
        })}`;
      }

      const extendedProps: Record<string, any> = {
        summary: event.summary
      };

      if (event.id) {
        extendedProps.url = this.resolver.resolve('faircalendar_events_edit', {
          id: event.id
        });
      }

      return {
        // See: https://fullcalendar.io/docs/event-object
        type: fcEventType,
        start: event.date,
        end: event.date,
        title,
        extendedProps,
        textColor: `var(--event-${fcEventType}-text)`,
        backgroundColor: `var(--event-${fcEventType}-background)`,
        borderColor: `var(--event-${fcEventType}-border)`
      };
    });

    const eventsByStartDate = ArrayUtils.groupBy(
      fullCalendarEvents,
      event => event.start
    );

    const listViewDays = this.dateUtils.getWeekDaysOfMonth(date).map(day => {
      return [
        day,
        eventsByStartDate[this.dateUtils.format(day, 'yyyy-MM-dd')] || []
      ];
    });

    return {
      users,
      overviewTable,
      fullCalendarEvents,
      date,
      currentMonth: date.getMonth() + 1,
      currentYear: date.getFullYear(),
      userId,
      viewName: req.cookies.faircalendar_view,
      listViewDays
    };
  }
}
