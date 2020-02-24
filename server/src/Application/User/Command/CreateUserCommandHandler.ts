import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateUserCommand} from './CreateUserCommand';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryption} from 'src/Application/IEncryption';
import {User} from 'src/Domain/User/User.entity';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryption')
    private readonly encryption: IEncryption,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: CreateUserCommand): Promise<string> {
    const {firstName, lastName, password} = command;
    const email = command.email.toLowerCase();

    if (true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    const hashPassword = await this.encryption.hash(password);
    const apiToken = await this.encryption.hash(email + password);

    const user = await this.userRepository.save(
      new User(firstName, lastName, email, apiToken, hashPassword)
    );

    return user.getId();
  }
}
