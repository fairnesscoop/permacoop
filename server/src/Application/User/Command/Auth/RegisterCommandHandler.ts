import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {RegisterCommand} from './RegisterCommand';
import {AuthenticatedView} from '../../View/Auth/AuthenticatedView';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IEncryptionAdapter} from 'src/Application/Adapter/IEncryptionAdapter';
import {User} from 'src/Domain/User/User.entity';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    private readonly canRegisterSpecification: CanRegisterSpecification
  ) {}

  public async execute(command: RegisterCommand): Promise<AuthenticatedView> {
    const {firstName, lastName, email, password} = command;

    if (false === (await this.canRegisterSpecification.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    const hashPassword = await this.encryptionAdapter.hash(password);
    const apiToken = await this.encryptionAdapter.hash(email + password);

    await this.userRepository.save(
      new User(firstName, lastName, email, apiToken, hashPassword)
    );

    return new AuthenticatedView(firstName, lastName, email, apiToken);
  }
}
