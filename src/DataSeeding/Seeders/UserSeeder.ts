import { Seeder } from '@concepta/typeorm-seeding';
import {
  UserFactory,
  JohnFactory,
  JaneFactory
} from '../Factories/UserFactory';

export class UserSeeder extends Seeder {
  async run() {
    const userFactory = this.factory(UserFactory);
    const johnFactory = this.factory(JohnFactory);
    const janeFactory = this.factory(JaneFactory);
    await johnFactory.create();
    await janeFactory.create();
    await userFactory.createMany(4);
  }
}
