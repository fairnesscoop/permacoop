import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {HolidayDTO} from '../DTO/HolidayDTO';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {UserRole, User} from 'src/Domain/HumanResource/User/User.entity';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {CreateHolidayCommand} from 'src/Application/HumanResource/Holiday/Command/CreateHolidayCommand';
import {LoggedUser} from '../../User/Decorator/LoggedUser';

@Controller('holidays')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateHolidayAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Create new holiday'})
  public async index(@Body() dto: HolidayDTO, @LoggedUser() user: User) {
    const {
      leaveType,
      startDate,
      startsAllDay,
      endDate,
      endsAllDay,
      comment
    } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateHolidayCommand(
          user,
          leaveType,
          startDate,
          startsAllDay === 'true',
          endDate,
          endsAllDay === 'true',
          comment
        )
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
