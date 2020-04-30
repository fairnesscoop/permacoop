import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IPayStubRepository} from 'src/Domain/Accounting/Repository/IPayStubRepository';
import {PayStub} from 'src/Domain/Accounting/PayStub.entity';
import {User} from 'src/Domain/User/User.entity';

export class PayStubRepository implements IPayStubRepository {
  constructor(
    @InjectRepository(PayStub)
    private readonly repository: Repository<PayStub>
  ) {}

  public save(payStub: PayStub): Promise<PayStub> {
    return this.repository.save(payStub);
  }

  public findOneByUserAndDate(
    user: User,
    date: Date
  ): Promise<PayStub | undefined> {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return this.repository
      .createQueryBuilder('payStub')
      .select(['payStub.id'])
      .where('payStub.user = :userId', {userId: user.getId()})
      .andWhere('extract(month FROM payStub.date) = :month', {month})
      .andWhere('extract(year FROM payStub.date) = :year', {year})
      .getOne();
  }
}
