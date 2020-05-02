import {Inject} from '@nestjs/common';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {IPayStubRepository} from '../Repository/IPayStubRepository';
import {PayStub} from '../PayStub.entity';

export class IsPayStubAlreadyExist {
  constructor(
    @Inject('IPayStubRepository')
    private readonly payStubRepository: IPayStubRepository
  ) {}

  public async isSatisfiedBy(user: User, date: Date): Promise<boolean> {
    return (
      (await this.payStubRepository.findOneByUserAndDate(user, date)) instanceof
      PayStub
    );
  }
}
