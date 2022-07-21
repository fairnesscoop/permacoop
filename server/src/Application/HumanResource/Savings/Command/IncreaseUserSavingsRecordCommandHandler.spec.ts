import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IncreaseUserSavingsRecordCommandHandler } from './IncreaseUserSavingsRecordCommandHandler';
import { IncreaseUserSavingsRecordCommand } from './IncreaseUserSavingsRecordCommand';
import {
  SavingsRecordType,
  UserSavingsRecord
} from 'src/Domain/HumanResource/Savings/UserSavingsRecord.entity';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { UserSavingsRecordRepository } from 'src/Infrastructure/HumanResource/Savings/Repository/UserSavingsRecordRepository';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { InterestRateRepository } from 'src/Infrastructure/HumanResource/Savings/Repository/InterestRateRepository';
import { InterestRateNotFoundException } from 'src/Domain/HumanResource/Savings/Exception/InterestRateNotFoundException';
import { InterestRate } from 'src/Domain/HumanResource/Savings/InterestRate.entity';

describe('IncreaseUserSavingsRecordCommandHandler', () => {
  let userRepository: UserRepository;
  let userSavingsRecordRepository: UserSavingsRecordRepository;
  let interestRateRepository: InterestRateRepository;
  let handler: IncreaseUserSavingsRecordCommandHandler;

  const user = mock(User);
  const command = new IncreaseUserSavingsRecordCommand(
    5000,
    'a58c5253-c097-4f44-b8c1-ccd45aab36e3'
  );

  beforeEach(() => {
    userRepository = mock(UserRepository);
    userSavingsRecordRepository = mock(UserSavingsRecordRepository);
    interestRateRepository = mock(InterestRateRepository);

    handler = new IncreaseUserSavingsRecordCommandHandler(
      instance(userRepository),
      instance(userSavingsRecordRepository),
      instance(interestRateRepository)
    );
  });

  it('testUserNotFound', async () => {
    when(
      userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(
        userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
      ).once();
      verify(userSavingsRecordRepository.save(anything())).never();
    }
  });

  it('testInterestRateNotFound', async () => {
    when(
      userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
    ).thenResolve(instance(user));
    when(interestRateRepository.findLatestInterestRate()).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(InterestRateNotFoundException);
      expect(e.message).toBe(
        'human_resources.savings_records.errors.interest_rate_not_found'
      );
      verify(
        userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
      ).once();
      verify(interestRateRepository.findLatestInterestRate()).once();
      verify(userSavingsRecordRepository.save(anything())).never();
    }
  });

  it('testAddSuccessfully', async () => {
    const userSavingsRecord = mock(UserSavingsRecord);
    const interestRate = mock(InterestRate);

    when(userSavingsRecord.getId()).thenReturn(
      '5c97487c-7863-46a2-967d-79eb8c94ecb5'
    );
    when(
      userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
    ).thenResolve(instance(user));
    when(interestRateRepository.findLatestInterestRate()).thenResolve(
      instance(interestRate)
    );
    when(
      userSavingsRecordRepository.save(
        deepEqual(
          new UserSavingsRecord(
            500000,
            SavingsRecordType.INPUT,
            instance(user),
            instance(interestRate)
          )
        )
      )
    ).thenResolve(instance(userSavingsRecord));

    expect(await handler.execute(command)).toBe(
      '5c97487c-7863-46a2-967d-79eb8c94ecb5'
    );

    verify(
      userRepository.findOneById('a58c5253-c097-4f44-b8c1-ccd45aab36e3')
    ).once();
    verify(interestRateRepository.findLatestInterestRate()).once();
    verify(
      userSavingsRecordRepository.save(
        deepEqual(
          new UserSavingsRecord(
            500000,
            SavingsRecordType.INPUT,
            instance(user),
            instance(interestRate)
          )
        )
      )
    ).once();
  });
});
