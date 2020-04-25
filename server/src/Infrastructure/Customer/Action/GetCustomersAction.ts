import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetCustomersQuery} from 'src/Application/Customer/Query/GetCustomersQuery';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/User/User.entity';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';

@Controller('customers')
@ApiUseTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetCustomersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all customers'})
  public async index(): Promise<CustomerView[]> {
    return await this.queryBus.execute(new GetCustomersQuery());
  }
}
