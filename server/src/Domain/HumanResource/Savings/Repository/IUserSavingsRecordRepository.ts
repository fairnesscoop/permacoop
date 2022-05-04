import { UserSavingsRecord } from '../UserSavingsRecord.entity';

export interface IUserSavingsRecordRepository {
  save(userSavingsRecord: UserSavingsRecord): Promise<UserSavingsRecord>;
  findUsersSavingsRecords(): Promise<UserSavingsRecord[]>;
}
