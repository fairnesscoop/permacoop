import { mock, instance } from 'ts-mockito';
import { User } from '../User/User.entity';
import { InterestRate } from './InterestRate.entity';
import {
  SavingsRecordType,
  UserSavingsRecord
} from './UserSavingsRecord.entity';

describe('UserSavingsRecord.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const interestRate = mock(InterestRate);
    const userSavingsRecord = new UserSavingsRecord(
      100000,
      SavingsRecordType.INPUT,
      instance(user),
      instance(interestRate)
    );

    expect(userSavingsRecord.getId()).toBe(undefined);
    expect(userSavingsRecord.getAmount()).toBe(100000);
    expect(userSavingsRecord.getUser()).toBe(instance(user));
    expect(userSavingsRecord.getInterestRate()).toBe(instance(interestRate));
    expect(userSavingsRecord.getType()).toBe(SavingsRecordType.INPUT);
  });
});
