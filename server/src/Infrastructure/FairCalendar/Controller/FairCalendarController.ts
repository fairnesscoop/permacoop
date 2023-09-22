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
import { WithName } from 'src/Infrastructure/Common/Routing/WithName';
import { FairCalendarControllerDTO } from '../DTO/FairCalendarControllerDTO';
import { EventView } from 'src/Application/FairCalendar/View/EventView';
import { ITranslator } from 'src/Application/ITranslations';
import { minutesToHours } from 'src/Infrastructure/Common/Utils/dateUtils';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';

@Controller('app/faircalendar')
@UseGuards(IsAuthenticatedGuard)
export class FairCalendarController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    @Inject('ITranslator')
    private readonly translator: ITranslator
  ) {}

  @Get()
  @WithName('faircalendar_index')
  @Render('pages/faircalendar_index')
  public async get(
    @Query() dto: FairCalendarControllerDTO,
    @LoggedUser() user: User
  ) {
    const date = dto.date ? new Date(dto.date) : new Date();
    const userId = dto.userId ? dto.userId : user['id'];

    const users: UserView[] = await this.queryBus.execute(new GetUsersQuery());

    const events: EventView[] = await this.queryBus.execute(
      new GetMonthlyFairCalendarQuery(date, userId)
    );

    const fullCalendarEvents = events.map(event => {
      let title = `${minutesToHours(event.time)} - `;
      if (event.type === 'mission' && event.task && event.project) {
        title += `${event.project.name} (${event.task.name})`;
      } else {
        title += `${this.translator.translate('faircalendar-type-option', {
          type: event.type
        })}`;
      }
      return {
        // See: https://fullcalendar.io/docs/event-object
        type: event.type,
        start: event.date,
        end: event.date,
        title,
        url: `/app/faircalendar/events/edit/${event.id}`,
        textColor: `var(--event-${event.type}-text)`,
        backgroundColor: `var(--event-${event.type}-background)`,
        borderColor: `var(--event-${event.type}-border)`
      };
    });

    return {
      users,
      fullCalendarEvents,
      date
    };
  }
}
