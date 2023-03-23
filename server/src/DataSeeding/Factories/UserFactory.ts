import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { UserAdministrativeFactory } from './UserAdministrativeFactory';

export class UserFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const user = new User(
      faker.name.firstName('female'),
      faker.name.lastName('female'),
      faker.internet.email(),
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      UserRole.COOPERATOR
    );
    return user;
  }

  protected async finalize(entity: User): Promise<void> {
    entity.userAdministrative = await this.factory(
      UserAdministrativeFactory
    ).create();
  }
}

export class JohnFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const user = new User(
      'john',
      'doe',
      'john@doe.com',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A',
      UserRole.COOPERATOR
    );
    return user;
  }

  protected async finalize(entity: User): Promise<void> {
    entity.userAdministrative = await this.factory(
      UserAdministrativeFactory
    ).create();
  }
}
