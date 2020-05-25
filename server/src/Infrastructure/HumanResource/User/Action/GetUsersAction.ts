import {Controller, Inject, Get, UseGuards, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {UserView} from 'src/Application/HumanResource/User/View/UserView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetUsersQuery} from 'src/Application/HumanResource/User/Query/GetUsersQuery';
import {FiltersDTO} from '../DTO/FiltersDTO';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({summary: 'Get all users'})
  public async index(@Query() query: FiltersDTO): Promise<UserView[]> {
    return await this.queryBus.execute(new GetUsersQuery(query.withAccountant));
  }
}
