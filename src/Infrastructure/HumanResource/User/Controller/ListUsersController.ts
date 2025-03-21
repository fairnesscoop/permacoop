import { Controller, Inject, UseGuards, Get, Render } from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { UserTableFactory } from '../Table/UserTableFactory';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';

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
    const activeUsers = await this.queryBus.execute(
      new GetUsersQuery(false, true, false)
    );
    const activeUsersTable = this.tableFactory.create(activeUsers);

    const inactiveUsers = await this.queryBus.execute(
      new GetUsersQuery(false, false, true)
    );
    const inactiveUsersTable = this.tableFactory.create(inactiveUsers);

    return { activeUsersTable, inactiveUsersTable };
  }
}
