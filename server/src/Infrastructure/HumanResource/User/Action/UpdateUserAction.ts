import {Controller, Inject, Param, UseGuards, NotFoundException, Body, Put} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserAdministrativeView} from 'src/Application/HumanResource/User/View/UserAdministrativeView';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from '../Decorator/Roles';
import {ICommandBus} from '@nestjs/cqrs';
import {UpdateUserCommand} from 'src/Application/HumanResource/User/Command/UpdateUserCommand';
import {UserAdministrativeDTO} from '../DTO/UserAdministrativeDTO';

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
    try {
      return await this.commandBus.execute(new UpdateUserCommand(
        dto.id,
        userAdministrativeDto.role,
        userAdministrativeDto.annualEarnings,
        userAdministrativeDto.contract,
        userAdministrativeDto.executivePosition,
        userAdministrativeDto.healthInsurance,
        userAdministrativeDto.joiningDate,
        userAdministrativeDto.leavingDate,
        userAdministrativeDto.transportFee,
      ));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
