import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IPaySlipRepository} from 'src/Domain/HumanResource/PaySlip/Repository/IPaySlipRepository';
import {PaySlip} from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export class PaySlipRepository implements IPaySlipRepository {
  constructor(
    @InjectRepository(PaySlip)
    private readonly repository: Repository<PaySlip>
  ) {}

  public save(paySlip: PaySlip): Promise<PaySlip> {
    return this.repository.save(paySlip);
  }

  public findOneByUserAndDate(
    user: User,
    date: Date
  ): Promise<PaySlip | undefined> {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return this.repository
      .createQueryBuilder('paySlip')
      .select(['paySlip.id'])
      .where('paySlip.user = :userId', {userId: user.getId()})
      .andWhere('extract(month FROM paySlip.date) = :month', {month})
      .andWhere('extract(year FROM paySlip.date) = :year', {year})
      .getOne();
  }

  public findAll(): Promise<PaySlip[]> {
    return this.repository
      .createQueryBuilder('paySlip')
      .select([
        'paySlip.id',
        'paySlip.date',
        'user.id',
        'user.firstName',
        'user.lastName',
        'file.id',
        'file.name',
        'file.size'
      ])
      .innerJoin('paySlip.file', 'file')
      .innerJoin('paySlip.user', 'user')
      .orderBy('paySlip.date', 'DESC')
      .getMany();
  }
}
