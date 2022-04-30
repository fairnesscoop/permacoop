import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IncreaseUserSavingsRecordCommand } from './IncreaseUserSavingsRecordCommand';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { SavingsRecordType, UserSavingsRecord } from 'src/Domain/HumanResource/Savings/UserSavingsRecord.entity';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { IUserSavingsRecordRepository } from 'src/Domain/HumanResource/Savings/Repository/IUserSavingsRecordRepository';

@CommandHandler(IncreaseUserSavingsRecordCommand)
export class IncreaseUserSavingsRecordCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserSavingsRecordRepository')
    private readonly userSavingsRecordRepository: IUserSavingsRecordRepository,
  ) {}

  public async execute(command: IncreaseUserSavingsRecordCommand): Promise<string> {
    const { userId, amount } = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const userSavingsRecord = await this.userSavingsRecordRepository.save(
      new UserSavingsRecord(
        Math.round(amount * 100),
        SavingsRecordType.INPUT,
        user,
      )
    );

    return userSavingsRecord.getId();
  }
}
