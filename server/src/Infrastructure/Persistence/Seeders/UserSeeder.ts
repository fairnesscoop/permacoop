import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const johnDoe = new User(
      'john',
      'doe',
      'john@doe.com',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      UserRole.COOPERATOR
    );

    const isabelOrtega = new User(
      'Isabel',
      'Ortega',
      'isabel@ortega.com',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      UserRole.COOPERATOR
    );

    await dataSource.createEntityManager().save<User>([johnDoe, isabelOrtega]);
  }
}
