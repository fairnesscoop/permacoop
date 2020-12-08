import { BadRequestException, Body, Controller, Inject, Param, Put, UseGuards } from '@nestjs/common';
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

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Update user info'})
  public async index(@Param() { id }: IdDTO, @Body() dto: UserAdministrativeDTO): Promise<UserAdministrativeView> {
    const {
      role,
      annualEarnings,
      contract,
      executivePosition,
      healthInsurance,
      joiningDate,
      leavingDate,
      transportFee,
    } = dto;

    try {
      return await this.commandBus.execute(new UpdateUserCommand(
        id,
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
      throw new BadRequestException(e.message);
    }
  }
}
