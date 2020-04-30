import {PayStub} from '../PayStub.entity';
import {User} from 'src/Domain/User/User.entity';

export interface IPayStubRepository {
  save(payStub: PayStub): Promise<PayStub>;
  findOneByUserAndDate(user: User, date: Date): Promise<PayStub | undefined>;
}
