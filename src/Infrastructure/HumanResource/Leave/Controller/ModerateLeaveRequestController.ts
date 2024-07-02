import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Body,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { ICommandBus } from 'src/Application/ICommandBus';
import { ModerationAction, ModerationDTO } from '../DTO/ModerationDTO';
import { AcceptLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/AcceptLeaveRequestCommand';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { RefuseLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/RefuseLeaveRequestCommand';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';

@Controller('app/people/leave-requests/moderation')
@UseGuards(IsAuthenticatedGuard)
export class ModerateLeaveRequestController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Post(':id')
  @WithName('people_leave_requests_moderation')
  public async post(
    @Param() { id }: IdDTO,
    @Body() { comment, action }: ModerationDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    const command =
      action === ModerationAction.ACCEPT
        ? new AcceptLeaveRequestCommand(user, id, comment)
        : new RefuseLeaveRequestCommand(user, id, comment);

    try {
      await this.commandBus.execute(command);

      res.redirect(303, this.resolver.resolve('people_leave_requests_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
