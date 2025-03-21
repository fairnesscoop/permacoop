import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Render,
  Get,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { LeaveRequestDTO } from '../DTO/LeaveRequestDTO';
import { CreateLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/CreateLeaveRequestCommand';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { getSelectableLeaveRequestTypes } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: Leave')
@Controller('app/people/leave-requests/add')
@UseGuards(IsAuthenticatedGuard)
export class AddLeaveRequestController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('people_leave_requests_add')
  @Render('pages/leave_requests/add.njk')
  public async get() {
    return {
      types: getSelectableLeaveRequestTypes()
    };
  }

  @Post()
  public async post(
    @Body() dto: LeaveRequestDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    const { type, startDate, startsAllDay, endDate, endsAllDay, comment } = dto;

    try {
      await this.commandBus.execute(
        new CreateLeaveRequestCommand(
          user,
          type,
          startDate,
          startsAllDay,
          endDate,
          endsAllDay,
          comment
        )
      );

      res.redirect(303, this.resolver.resolve('people_leave_requests_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
