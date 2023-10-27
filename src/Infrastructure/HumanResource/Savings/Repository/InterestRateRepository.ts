import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInterestRateRepository } from 'src/Domain/HumanResource/Savings/Repository/IInterestRateRepository';
import { InterestRate } from 'src/Domain/HumanResource/Savings/InterestRate.entity';

export class InterestRateRepository implements IInterestRateRepository {
  constructor(
    @InjectRepository(InterestRate)
    private readonly repository: Repository<InterestRate>
  ) {}

  public findLatestInterestRate(): Promise<InterestRate> {
    return this.repository
      .createQueryBuilder('interestRate')
      .select(['interestRate.id'])
      .limit(1)
      .orderBy('interestRate.createdAt', 'DESC')
      .getOne();
  }
}
