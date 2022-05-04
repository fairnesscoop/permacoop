import { InterestRate } from '../InterestRate.entity';

export interface IInterestRateRepository {
  findLatestInterestRate(): Promise<InterestRate>;
}
