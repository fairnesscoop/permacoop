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
import { MenstrualLeaveMonthlyQuotaExceededException } from 'src/Domain/HumanResource/Leave/Exception/MenstrualLeaveMonthlyQuotaExceededException';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';

@Controller('app/people/leave-requests/add')
@UseGuards(IsAuthenticatedGuard)
export class AddLeaveRequestController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('ITranslator')
    private readonly translator: ITranslator,
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
      if (e instanceof MenstrualLeaveMonthlyQuotaExceededException) {
        res.render('pages/leave_requests/add.njk', {
          types: getSelectableLeaveRequestTypes(),
          errorModal: true
        });
        return;
      }
      throw new BadRequestException(e.message);
    }
  }
}
