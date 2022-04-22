import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { LeaveRequestDTO } from '../DTO/LeaveRequestDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole, User } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { CreateLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/CreateLeaveRequestCommand';
import { LoggedUser } from '../../User/Decorator/LoggedUser';

@Controller('leave-requests')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateLeaveRequestAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create new leave request' })
  public async index(@Body() dto: LeaveRequestDTO, @LoggedUser() user: User) {
    const { type, startDate, startsAllDay, endDate, endsAllDay, comment } = dto;

    try {
      const id = await this.commandBus.execute(
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

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
