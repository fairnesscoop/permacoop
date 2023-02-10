import { Seeder } from '@concepta/typeorm-seeding';
import { UserFactory, JohnFactory } from '../Factories/UserFactory';

export class UserSeeder extends Seeder {
  async run() {
    const userFactory = this.factory(UserFactory);
    const johnFactory = this.factory(JohnFactory);
    await johnFactory.create();
    await userFactory.createMany(5);
  }
}
