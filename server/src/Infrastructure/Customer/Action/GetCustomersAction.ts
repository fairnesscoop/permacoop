import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetCustomersQuery} from 'src/Application/Customer/Query/GetCustomersQuery';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {PaginationDTO} from 'src/Infrastructure/Common/DTO/PaginationDTO';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('customers')
@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetCustomersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all customers'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<CustomerView>> {
    return await this.queryBus.execute(
      new GetCustomersQuery(Number(pagination.page))
    );
  }
}
