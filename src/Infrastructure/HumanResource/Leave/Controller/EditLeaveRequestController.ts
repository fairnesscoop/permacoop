import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Render,
  Get,
  Param,
  Res
} from '@nestjs/common';
import { ICommandBus } from 'src/Application/ICommandBus';
import { Response } from 'express';
import { LeaveRequestDTO } from '../DTO/LeaveRequestDTO';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import {
  Status,
  Type
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { UpdateLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/UpdateLeaveRequestCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { GetLeaveRequestByIdQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestByIdQuery';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { DoesLeaveRequestBelongToUser } from 'src/Domain/HumanResource/Leave/Specification/DoesLeaveRequestBelongToUser';

@Controller('app/people/leave-requests/edit')
@UseGuards(IsAuthenticatedGuard)
export class EditLeaveRequestController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver,
    private readonly doesLeaveRequestBelongToUser: DoesLeaveRequestBelongToUser
  ) {}

  @Get(':id')
  @WithName('people_leave_requests_edit')
  @Render('pages/leave_requests/edit.njk')
  public async get(@Param() { id }: IdDTO, @LoggedUser() user: User) {
    const leaveRequest = await this.queryBus.execute(
      new GetLeaveRequestByIdQuery(id, user)
    );

    const types = Object.values(Type);

    return {
      leaveRequest,
      types,
      canDelete:
        leaveRequest.status === Status.PENDING &&
        this.doesLeaveRequestBelongToUser.isSatisfiedBy(leaveRequest, user)
    };
  }

  @Post(':id')
  public async post(
    @Param() { id }: IdDTO,
    @Body() dto: LeaveRequestDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    const { type, startDate, startsAllDay, endDate, endsAllDay, comment } = dto;

    try {
      await this.commandBus.execute(
        new UpdateLeaveRequestCommand(
          id,
          type,
          startDate,
          startsAllDay,
          endDate,
          endsAllDay,
          user,
          comment
        )
      );

      res.redirect(303, this.resolver.resolve('people_leave_requests_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
