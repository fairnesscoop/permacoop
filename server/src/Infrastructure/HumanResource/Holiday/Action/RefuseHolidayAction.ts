import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Put,
  Body
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole, User} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {RefuseHolidayCommand} from 'src/Application/HumanResource/Holiday/Command/RefuseHolidayCommand';
import {LoggedUser} from '../../User/Decorator/LoggedUser';
import {ICommandBus} from 'src/Application/ICommandBus';
import {ModerationDTO} from '../DTO/ModerationDTO';

@Controller('holidays')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class RefuseHolidayAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id/refuse')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({summary: 'Refuse holiday'})
  public async index(
    @Param() dto: IdDTO,
    @Body() moderation: ModerationDTO,
    @LoggedUser() user: User
  ) {
    try {
      const id = await this.commandBus.execute(
        new RefuseHolidayCommand(user, dto.id, moderation.comment)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
