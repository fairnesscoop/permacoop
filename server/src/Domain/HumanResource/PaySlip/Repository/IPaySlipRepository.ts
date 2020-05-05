import {PaySlip} from '../PaySlip.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export interface IPaySlipRepository {
  save(paySlip: PaySlip): Promise<PaySlip>;
  findOneByUserAndDate(user: User, date: Date): Promise<PaySlip | undefined>;
  findAll(): Promise<PaySlip[]>;
  findOneById(id: string): Promise<PaySlip | undefined>;
}
