import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUsersSavingsRecordsBalanceQuery } from './GetUsersSavingsRecordsBalanceQuery';
import { IUserSavingsRecordRepository } from 'src/Domain/HumanResource/Savings/Repository/IUserSavingsRecordRepository';
import { UserSavingsRecordsBalanceView } from '../View/UserSavingsRecordsBalanceView';
import { GetUserSavingsRecordBalance } from 'src/Domain/HumanResource/Savings/GetUserSavingsRecordBalance';

@QueryHandler(GetUsersSavingsRecordsBalanceQuery)
export class GetUsersSavingsRecordsBalanceQueryHandler {
  constructor(
    @Inject('IUserSavingsRecordRepository')
    private readonly userSavingsRecordRepository: IUserSavingsRecordRepository,
    private readonly getUserSavingsRecordBalance: GetUserSavingsRecordBalance,
  ) {}

  public async execute(
    query: GetUsersSavingsRecordsBalanceQuery
  ): Promise<UserSavingsRecordsBalanceView[]> {
    const userSavingsRecords = await this.userSavingsRecordRepository.findUsersSavingsRecords();
    const userSavingsRecordsBalances: UserSavingsRecordsBalanceView[] = [];
    const usersBalances = this.getUserSavingsRecordBalance.get(userSavingsRecords);

    for (const [userId, {firstName, lastName, balance}] of Object.entries(usersBalances)) {
      userSavingsRecordsBalances.push(
        new UserSavingsRecordsBalanceView(
          userId,
          firstName,
          lastName,
          balance / 100,
        )
      );
    };

    return userSavingsRecordsBalances;
  }
}
