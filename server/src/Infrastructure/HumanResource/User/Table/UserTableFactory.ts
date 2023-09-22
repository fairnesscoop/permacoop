import { Injectable } from '@nestjs/common';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Row, Table } from 'src/Infrastructure/Common/Table/Table';

@Injectable()
export class UserTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

  public create(users: UserView[]): Table {
    const columns = [
      'users-firstName',
      'users-lastName',
      'users-email',
      'users-role',
      'common-actions'
    ];

    const rows = users.map(
      (user): Row => [
        user.firstName,
        user.lastName,
        user.email,
        { trans: { message: 'users-role-value', params: { role: user.role } } },
        {
          actions: {
            edit: {
              url: this.resolver.resolve('people_users_edit', {
                id: user.id
              })
            }
          }
        }
      ]
    );

    return new Table(columns, rows);
  }
}
