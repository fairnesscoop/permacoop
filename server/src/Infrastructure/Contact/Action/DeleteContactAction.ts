import {
  Param,
  Delete,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { DeleteContactCommand } from 'src/Application/Contact/Command/DeleteContactCommand';

@Controller('contacts')
@ApiTags('Contact')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class DeleteContactAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Delete contact' })
  public async index(@Param() dto: IdDTO) {
    try {
      await this.commandBus.execute(new DeleteContactCommand(dto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
