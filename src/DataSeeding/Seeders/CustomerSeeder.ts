import { Seeder } from '@concepta/typeorm-seeding';
import { CustomerFactory } from '../Factories/CustomerFactory';
import { Customer } from 'src/Domain/Customer/Customer.entity';

export class CustomerSeeder extends Seeder {
  async run() {
    const customerFactory = this.factory(CustomerFactory);
    customerFactory.save(new Customer('Aperture Science'));
  }
}
