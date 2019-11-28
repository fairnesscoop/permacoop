import {Inject, Injectable} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {IUserRepository} from '../Repository/IUserRepository';
import {User} from '../User.entity';

@Injectable()
export class CanRegisterSpecification implements ISpecification {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async isSatisfiedBy(email: string): Promise<boolean> {
    return !((await this.userRepository.findOneByEmail(email)) instanceof User);
  }
}
