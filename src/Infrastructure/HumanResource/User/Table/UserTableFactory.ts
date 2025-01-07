import { Injectable } from '@nestjs/common';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { Table } from 'src/Infrastructure/Tables';

@Injectable()
export class UserTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private readonly rowFactory: RowFactory
  ) {}

  public create(users: UserView[]): Table {
    const columns = [
      'users-lastName',
      'users-firstName',
      'users-email',
      'users-role',
      'common-actions'
    ];

    const rows = users.map(user =>
      this.rowFactory
        .createBuilder()
        .value(user.lastName)
        .value(user.firstName)
        .value(user.email)
        .trans('users-role-value', { role: user.role })
        .actions({
          edit: {
            url: this.resolver.resolve('people_users_edit', {
              id: user.id
            })
          }
        })
        .build()
    );

    return new Table(columns, rows);
  }
}
