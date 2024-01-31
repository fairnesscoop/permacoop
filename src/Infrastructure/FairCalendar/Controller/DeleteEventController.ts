import {
  BadRequestException,
  Controller,
  Inject,
  Param,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { DeleteEventCommand } from 'src/Application/FairCalendar/Command/DeleteEventCommand';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { EventView } from 'src/Application/FairCalendar/View/EventView';
import { GetEventByIdQuery } from 'src/Application/FairCalendar/Query/GetEventByIdQuery';
import { makeMonthUrl } from '../Routing/urls';

@Controller('app/faircalendar/events/delete')
@UseGuards(IsAuthenticatedGuard)
export class DeleteEventController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Post(':id')
  @WithName('faircalendar_event_delete')
  public async post(
    @Param() dto: IdDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      const event: EventView = await this.queryBus.execute(
        new GetEventByIdQuery(dto.id)
      );
      await this.commandBus.execute(new DeleteEventCommand(dto.id, user));
      res.redirect(303, makeMonthUrl(this.resolver, new Date(event.date)));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
