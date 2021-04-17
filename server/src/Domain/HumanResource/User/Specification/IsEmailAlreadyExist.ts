import { Inject } from '@nestjs/common';
import { IUserRepository } from '../Repository/IUserRepository';
import { User } from '../User.entity';

export class IsEmailAlreadyExist {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async isSatisfiedBy(email: string): Promise<boolean> {
    return (await this.userRepository.findOneByEmail(email)) instanceof User;
  }
}
