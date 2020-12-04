import { Body, Controller, Inject, NotFoundException, Param, Put, UseGuards } from '@nestjs/common';
import { ICommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserCommand } from 'src/Application/HumanResource/User/Command/UpdateUserCommand';
import { UserAdministrativeView } from 'src/Application/HumanResource/User/View/UserAdministrativeView';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from '../Decorator/Roles';
import { UserAdministrativeDTO } from '../DTO/UserAdministrativeDTO';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateUserAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id/administrative')
  @Roles(UserRole.COOPERATOR)
  @ApiOperation({summary: 'Update user administrative info'})
  public async index(@Param() dto: IdDTO, @Body() userAdministrativeDto: UserAdministrativeDTO): Promise<UserAdministrativeView> {
    const {
      role,
      annualEarnings,
      contract,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee,
    } = userAdministrativeDto;

    try {
      return await this.commandBus.execute(new UpdateUserCommand(
        dto.id,
        role,
        annualEarnings,
        contract,
        executivePosition,
        healthInsurance,
        joiningDate,
        leavingDate,
        transportFee,
      ));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
