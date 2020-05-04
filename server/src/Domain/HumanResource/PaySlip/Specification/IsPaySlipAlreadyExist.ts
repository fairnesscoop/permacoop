import {Inject} from '@nestjs/common';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {IPaySlipRepository} from '../Repository/IPaySlipRepository';
import {PaySlip} from '../PaySlip.entity';

export class IsPaySlipAlreadyExist {
  constructor(
    @Inject('IPaySlipRepository')
    private readonly paySlipRepository: IPaySlipRepository
  ) {}

  public async isSatisfiedBy(user: User, date: Date): Promise<boolean> {
    return (
      (await this.paySlipRepository.findOneByUserAndDate(user, date)) instanceof
      PaySlip
    );
  }
}
