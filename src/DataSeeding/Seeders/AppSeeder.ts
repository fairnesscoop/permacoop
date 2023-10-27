import { Seeder } from '@concepta/typeorm-seeding';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { UserFactory } from '../Factories/UserFactory';

import { UserSeeder } from './UserSeeder';

export class AppSeeder extends Seeder {
  async run() {
    const userSeeder = new UserSeeder({
      factories: [
        new UserFactory({
          entity: User
        })
      ]
    });
    await this.call([userSeeder]);
  }
}
