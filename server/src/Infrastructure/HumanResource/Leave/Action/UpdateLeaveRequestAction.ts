import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { LeaveRequestDTO } from '../DTO/LeaveRequestDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole, } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UpdateLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/UpdateLeaveRequestCommand';

@Controller('leave-requests')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateLeaveRequestAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) { }

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Update existing leave request' })
  public async index(
    @Param() { id },
    @Body() dto: LeaveRequestDTO,
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
          comment
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
