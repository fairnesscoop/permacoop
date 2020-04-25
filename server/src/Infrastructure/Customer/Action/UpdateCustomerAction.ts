import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {UpdateCustomerCommand} from 'src/Application/Customer/Command/UpdateCustomerCommand';
import {CustomerDTO} from '../DTO/CustomerDTO';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {UserRole} from 'src/Domain/User/User.entity';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateCustomerAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Update customer'})
  public async index(@Param() dto: IdDTO, @Body() customerDto: CustomerDTO) {
    try {
      const {
        address: {street, city, zipCode, country},
        name
      } = customerDto;
      const {id} = dto;

      await this.commandBus.execute(
        new UpdateCustomerCommand(id, name, street, city, zipCode, country)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
