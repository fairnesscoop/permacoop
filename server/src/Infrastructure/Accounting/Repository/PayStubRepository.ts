import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IPayStubRepository} from 'src/Domain/Accounting/Repository/IPayStubRepository';
import {PayStub} from 'src/Domain/Accounting/PayStub.entity';

export class PayStubRepository implements IPayStubRepository {
  constructor(
    @InjectRepository(PayStub)
    private readonly repository: Repository<PayStub>
  ) {}

  public save(payStub: PayStub): Promise<PayStub> {
    return this.repository.save(payStub);
  }
}
