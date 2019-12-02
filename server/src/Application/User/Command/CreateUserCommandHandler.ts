import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateUserCommand} from './CreateUserCommand';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';
import {User} from 'src/Domain/User/User.entity';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {UserView} from '../View/UserView';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    private readonly canRegisterSpecification: CanRegisterSpecification
  ) {}

  public async execute(command: CreateUserCommand): Promise<UserView> {
    const {firstName, lastName, password} = command;
    const email = command.email.toLowerCase();

    if (false === (await this.canRegisterSpecification.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    const hashPassword = await this.encryptionAdapter.hash(password);
    const apiToken = await this.encryptionAdapter.hash(email + password);

    const user = await this.userRepository.save(
      new User(firstName, lastName, email, apiToken, hashPassword)
    );

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail()
    );
  }
}
