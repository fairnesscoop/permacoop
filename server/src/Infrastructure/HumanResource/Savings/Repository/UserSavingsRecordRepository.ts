import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserSavingsRecordRepository } from 'src/Domain/HumanResource/Savings/Repository/IUserSavingsRecordRepository';
import { UserSavingsRecord } from 'src/Domain/HumanResource/Savings/UserSavingsRecord.entity';

export class UserSavingsRecordRepository implements IUserSavingsRecordRepository {
  constructor(
    @InjectRepository(UserSavingsRecord)
    private readonly repository: Repository<UserSavingsRecord>
  ) {}

  public save(userSavingsRecord: UserSavingsRecord): Promise<UserSavingsRecord> {
    return this.repository.save(userSavingsRecord);
  }
}
