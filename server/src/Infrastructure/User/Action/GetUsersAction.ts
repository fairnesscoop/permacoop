import {Controller, Inject, Get, UseGuards, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {UserView} from 'src/Application/User/View/UserView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetUsersQuery} from 'src/Application/User/Query/GetUsersQuery';
import {FiltersDTO} from '../DTO/FiltersDTO';
import {Roles} from '../Decorator/Roles';
import {RolesGuard} from '../Security/RolesGuard';
import {UserRole} from 'src/Domain/User/User.entity';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetUsersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all users'})
  public async index(@Query() query: FiltersDTO): Promise<UserView[]> {
    return await this.queryBus.execute(new GetUsersQuery(query.withAccountant));
  }
}
