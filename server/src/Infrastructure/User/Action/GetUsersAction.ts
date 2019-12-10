import {Controller, Inject, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {UserView} from 'src/Application/User/View/UserView';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetUsersQuery} from 'src/Application/User/Query/GetUsersQuery';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get()
  @ApiOperation({title: 'Get all users'})
  public async index(): Promise<UserView[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
