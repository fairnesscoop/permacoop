import { Seeder } from '@concepta/typeorm-seeding';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { UserFactory } from '../Factories/UserFactory';

import { UserSeeder } from './UserSeeder';
import { CustomerSeeder } from './CustomerSeeder';
import { CustomerFactory } from '../Factories/CustomerFactory';

export class AppSeeder extends Seeder {
  async run() {
    const userSeeder = new UserSeeder({
      factories: [
        new UserFactory({
          entity: User
        })
      ]
    });

    const customerSeeder = new CustomerSeeder({
      factories: [new CustomerFactory()]
    });

    await this.call([userSeeder, customerSeeder]);
  }
}
