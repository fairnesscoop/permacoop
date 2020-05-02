import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateUserCommand} from './CreateUserCommand';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {IPasswordEncoder} from 'src/Application/IPasswordEncoder';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {IsEmailAlreadyExist} from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/HumanResource/User/Exception/EmailAlreadyExistException';
import {IDateUtils} from 'src/Application/IDateUtils';
import {EntryDateMissingException} from 'src/Domain/HumanResource/User/Exception/EntryDateMissingException';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: CreateUserCommand): Promise<string> {
    const {firstName, lastName, password, entryDate, role} = command;
    const email = command.email.toLowerCase();

    if (true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    if (role !== UserRole.ACCOUNTANT && !entryDate) {
      throw new EntryDateMissingException();
    }

    const hashPassword = await this.passwordEncoder.hash(password);
    const apiToken = await this.passwordEncoder.hash(email + password);
    const user = await this.userRepository.save(
      new User(
        firstName,
        lastName,
        email,
        apiToken,
        hashPassword,
        role,
        entryDate ? this.dateUtils.format(entryDate, 'y-MM-dd') : null
      )
    );

    return user.getId();
  }
}
