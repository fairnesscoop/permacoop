import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {IQueryBus} from 'src/Application/IQueryBus';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('customers')
@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetCustomerAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get customer'})
  public async index(@Param() dto: IdDTO): Promise<CustomerView> {
    try {
      return await this.queryBus.execute(new GetCustomerByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
