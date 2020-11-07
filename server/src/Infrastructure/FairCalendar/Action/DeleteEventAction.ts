import {
  Delete,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  HttpCode
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {LoggedUser} from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {DeleteEventCommand} from 'src/Application/FairCalendar/Command/DeleteEventCommand';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('events')
@ApiTags('FairCalendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class DeleteEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Delete an event'})
  @HttpCode(204)
  public async index(@Param() dto: IdDTO, @LoggedUser() user: User) {
    try {
      await this.commandBus.execute(new DeleteEventCommand(dto.id, user));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
