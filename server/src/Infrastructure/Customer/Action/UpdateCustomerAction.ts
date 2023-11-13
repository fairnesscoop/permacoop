import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateCustomerCommand } from 'src/Application/Customer/Command/UpdateCustomerCommand';
import { CustomerDTO } from '../DTO/CustomerDTO';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';

@Controller('customers')
@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateCustomerAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Update customer' })
  public async index(@Param() dto: IdDTO, @Body() customerDto: CustomerDTO) {
    try {
      const { name } = customerDto;
      const { id } = dto;

      await this.commandBus.execute(new UpdateCustomerCommand(id, name));

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
