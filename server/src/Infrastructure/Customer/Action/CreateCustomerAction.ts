import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateCustomerCommand } from 'src/Application/Customer/Command/CreateCustomerCommand';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CustomerDTO } from '../DTO/CustomerDTO';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';

@Controller('customers')
@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateCustomerAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create new customer' })
  public async index(@Body() customerDto: CustomerDTO) {
    const {
      address: { street, city, zipCode, country },
      name
    } = customerDto;

    try {
      const id = await this.commandBus.execute(
        new CreateCustomerCommand(name, street, city, zipCode, country)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
