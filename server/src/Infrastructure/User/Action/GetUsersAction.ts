import {Controller, Inject, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {UserView} from 'src/Application/User/View/UserView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetUsersQuery} from 'src/Application/User/Query/GetUsersQuery';

@Controller('users')
@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get all users'})
  public async index(): Promise<UserView[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
