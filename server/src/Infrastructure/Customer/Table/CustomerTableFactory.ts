import { Injectable } from '@nestjs/common';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Row, Table } from 'src/Infrastructure/Common/Table/Table';

@Injectable()
export class CustomerTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

  public create(customers: CustomerView[]): Table {
    const columns = [
      'crm-customers-name',
      'crm-customers-street',
      'common-actions'
    ];

    const rows = customers.map(
      (customer): Row => [
        customer.name,
        {
          safe: `${customer.address.street}<br>${customer.address.zipCode} ${customer.address.city}<br>${customer.address.country}`
        },
        {
          actions: {
            edit: {
              url: this.resolver.resolve('crm_customers_edit', {
                id: customer.id
              })
            }
          }
        }
      ]
    );

    return new Table(columns, rows);
  }
}
