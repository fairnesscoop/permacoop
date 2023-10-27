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
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { DeleteEventCommand } from 'src/Application/FairCalendar/Command/DeleteEventCommand';

@Controller('app/faircalendar/events/delete')
@UseGuards(IsAuthenticatedGuard)
export class DeleteEventController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post(':id')
  @WithName('faircalendar_event_delete')
  public async post(
    @Param() dto: IdDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      await this.commandBus.execute(new DeleteEventCommand(dto.id, user));
      res.redirect(303, '/app/faircalendar');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
