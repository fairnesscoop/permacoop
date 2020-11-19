import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Put,
  Body
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole, User } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { ICommandBus } from 'src/Application/ICommandBus';
import { ModerationDTO } from '../DTO/ModerationDTO';
import { AcceptLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/AcceptLeaveRequestCommand';

@Controller('leave-requests')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AcceptLeaveRequestAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id/accept')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({summary: 'Accept leave request'})
  public async index(
    @Param() dto: IdDTO,
    @Body() moderation: ModerationDTO,
    @LoggedUser() user: User
  ) {
    try {
      const id = await this.commandBus.execute(
        new AcceptLeaveRequestCommand(user, dto.id, moderation.comment)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
