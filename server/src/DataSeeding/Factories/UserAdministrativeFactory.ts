import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import {
  UserAdministrative,
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
const dateUtils: DateUtilsAdapter = new DateUtilsAdapter();

export class UserAdministrativeFactory extends Factory<UserAdministrative> {
  protected async entity(): Promise<UserAdministrative> {
    const userAdministrative = new UserAdministrative(
      faker.datatype.number({ min: 40, max: 53 }) * 1000 * 100,
      true,
      true,
      ContractType.CDI,
      WorkingTimeType.FULL_TIME,
      dateUtils.format(faker.date.past(), 'y-MM-dd'),
      null,
      700 * 100
    );

    return userAdministrative;
  }
}
