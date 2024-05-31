import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Response } from 'express';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { ICommandBus } from 'src/Application/ICommandBus';
import { DeleteLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/DeleteLeaveRequestCommand';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';

@Controller('app/people/leave-requests/delete')
@UseGuards(IsAuthenticatedGuard)
export class DeleteLeaveRequestController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Post(':id')
  @WithName('people_leave_requests_delete')
  public async index(
    @Param() { id }: IdDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      await this.commandBus.execute(new DeleteLeaveRequestCommand(id, user));

      res.redirect(303, this.resolver.resolve('people_leave_requests_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
