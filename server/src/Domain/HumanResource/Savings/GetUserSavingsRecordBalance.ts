import { Inject } from '@nestjs/common';
import { IDateUtils } from 'src/Application/IDateUtils';
import { SavingsRecordType, UserSavingsRecord } from './UserSavingsRecord.entity';

type UserSavingsRecordBalanceType = {
  [id: string]: {
    firstName: string;
    lastName: string;
    balance: number;
  }
}

export class GetUserSavingsRecordBalance {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public get(userSavingsRecords: UserSavingsRecord[]): UserSavingsRecordBalanceType {
    let usersBalances: UserSavingsRecordBalanceType = {};
    const currentDate = this.dateUtils.getCurrentDate();

    for (const savingsRecord of userSavingsRecords) {
      const user = savingsRecord.getUser();
      const previousBalance = usersBalances[user.getId()]?.balance || 0;

      let balance = 0;

      if (savingsRecord.getType() === SavingsRecordType.INPUT) {
        //if ()
        balance = previousBalance + savingsRecord.getAmountWithInterestRate();
      } else {
        balance = previousBalance - savingsRecord.getAmount();
      }

      usersBalances = {
        ...usersBalances,
        [user.getId()]: {
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
          balance,
        }
      };
    }

    return usersBalances;
  }
}
