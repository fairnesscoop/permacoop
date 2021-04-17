import { PaySlip } from '../PaySlip.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export interface IPaySlipRepository {
  save(paySlip: PaySlip): Promise<PaySlip>;
  findOneByUserAndDate(user: User, date: Date): Promise<PaySlip | undefined>;
  findPaySlips(page: number): Promise<[PaySlip[], number]>;
  findOneById(id: string): Promise<PaySlip | undefined>;
}
