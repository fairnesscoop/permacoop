import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreatePayStubCommand} from './CreatePayStubCommand';
import {IPayStubRepository} from 'src/Domain/HumanResource/Repository/IPayStubRepository';
import {PayStub} from 'src/Domain/HumanResource/PayStub.entity';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IFileRepository} from 'src/Domain/File/Repository/IFileRepository';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';
import {FileNotFoundException} from 'src/Domain/File/Exception/FileNotFoundException';
import {IsPayStubAlreadyExist} from 'src/Domain/HumanResource/Specification/IsPayStubAlreadyExist';
import {PayStubAlreadyExistException} from 'src/Domain/HumanResource/Exception/PayStubAlreadyExistException';

@CommandHandler(CreatePayStubCommand)
export class CreatePayStubCommandHandler {
  constructor(
    @Inject('IPayStubRepository')
    private readonly payStubRepository: IPayStubRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IFileRepository')
    private readonly fileRepository: IFileRepository,
    @Inject('IsPayStubAlreadyExist')
    private readonly isPayStubAlreadyExist: IsPayStubAlreadyExist
  ) {}

  public async execute(command: CreatePayStubCommand): Promise<string> {
    const {date, fileId, userId} = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const file = await this.fileRepository.findOneById(fileId);
    if (!file) {
      throw new FileNotFoundException();
    }

    if (
      true ===
      (await this.isPayStubAlreadyExist.isSatisfiedBy(user, new Date(date)))
    ) {
      this.fileRepository.remove(file);

      throw new PayStubAlreadyExistException();
    }

    const payStub = await this.payStubRepository.save(
      new PayStub(date, file, user)
    );

    return payStub.getId();
  }
}
