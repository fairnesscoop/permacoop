import {
  Controller,
  Get,
  Inject,
  Query,
  Render,
  UseGuards
} from '@nestjs/common';
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

@Controller('app/faircalendar')
@UseGuards(IsAuthenticatedGuard)
export class FairCalendarController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    @Inject('ITranslator')
    private readonly translator: ITranslator,
    private overviewFactory: FairCalendarOverviewFactory,
    private overviewTableFactory: FairCalendarOverviewTableFactory
  ) {}

  @Get()
  @WithName('faircalendar_index')
  @Render('pages/faircalendar/index.njk')
  public async get(
    @Query() dto: FairCalendarControllerDTO,
    @LoggedUser() user: User
  ) {
    const date =
      dto.month !== undefined && dto.year !== undefined
        ? new Date(dto.year, dto.month, 15)
        : new Date();

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

      return {
        // See: https://fullcalendar.io/docs/event-object
        type: fcEventType,
        start: event.date,
        end: event.date,
        title,
        ...(event.id
          ? {
              extendedProps: {
                url: `/app/faircalendar/events/edit/${event.id}`
              }
            }
          : {}),
        textColor: `var(--event-${fcEventType}-text)`,
        backgroundColor: `var(--event-${fcEventType}-background)`,
        borderColor: `var(--event-${fcEventType}-border)`
      };
    });

    const currentYear = date.getFullYear();
    const minYear = dto.minYear ?? currentYear - 5;
    const maxYear = dto.maxYear ?? currentYear;

    return {
      users,
      overviewTable,
      fullCalendarEvents,
      date,
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear(),
      minYear,
      maxYear,
      userId
    };
  }
}
