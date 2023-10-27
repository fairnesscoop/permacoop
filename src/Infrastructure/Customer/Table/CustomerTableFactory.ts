import { Injectable } from '@nestjs/common';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { Row, Table } from 'src/Infrastructure/Tables';

@Injectable()
export class CustomerTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private readonly rowFactory: RowFactory
  ) {}

  public create(customers: CustomerView[]): Table {
    const columns = [
      'crm-customers-name',
      'crm-customers-street',
      'common-actions'
    ];

    const rows = customers.map(customer =>
      this.rowFactory
        .createBuilder()
        .value(customer.name)
        .template('pages/customers/_address.njk', { address: customer.address })
        .actions({
          edit: {
            url: this.resolver.resolve('crm_customers_edit', {
              id: customer.id
            })
          }
        })
        .build()
    );

    return new Table(columns, rows);
  }
}
