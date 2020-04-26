import {PayStub} from '../PayStub.entity';

export interface IPayStubRepository {
  save(payStub: PayStub): Promise<PayStub>;
}
