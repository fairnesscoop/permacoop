import { Controller, Inject, UseGuards, Get, Render } from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';
import { UserTableFactory } from '../Table/UserTableFactory';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: User')
@Controller('app/people/users')
@UseGuards(IsAuthenticatedGuard)
export class ListUsersController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: UserTableFactory
  ) {}

  @Get()
  @WithName('people_users_list')
  @Render('pages/users/list.njk')
  public async get() {
    const users = await this.queryBus.execute(new GetUsersQuery());

    const table = this.tableFactory.create(users);

    return { table };
  }
}
