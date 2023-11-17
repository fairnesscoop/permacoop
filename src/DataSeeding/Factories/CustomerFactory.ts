import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Customer } from 'src/Domain/Customer/Customer.entity';

export class CustomerFactory extends Factory<Customer> {
  // protected async entity(): Promise<Customer> {
  //   return new Customer(
  //     faker.company.name(),
  //   );
  // }
}
