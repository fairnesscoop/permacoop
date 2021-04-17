import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole, User } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { ICommandBus } from 'src/Application/ICommandBus';
import { DeleteLeaveRequestCommand } from 'src/Application/HumanResource/Leave/Command/DeleteLeaveRequestCommand';

@Controller('leave-requests')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class DeleteLeaveRequestAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({ summary: 'Delete leave request' })
  public async index(@Param() { id }: IdDTO, @LoggedUser() user: User) {
    try {
      await this.commandBus.execute(new DeleteLeaveRequestCommand(id, user));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
