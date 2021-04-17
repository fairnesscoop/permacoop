import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePaySlipCommand } from './CreatePaySlipCommand';
import { IPaySlipRepository } from 'src/Domain/HumanResource/PaySlip/Repository/IPaySlipRepository';
import { PaySlip } from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { IFileRepository } from 'src/Domain/File/Repository/IFileRepository';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { FileNotFoundException } from 'src/Domain/File/Exception/FileNotFoundException';
import { IsPaySlipAlreadyExist } from 'src/Domain/HumanResource/PaySlip/Specification/IsPaySlipAlreadyExist';
import { PaySlipAlreadyExistException } from 'src/Domain/HumanResource/PaySlip/Exception/PaySlipAlreadyExistException';

@CommandHandler(CreatePaySlipCommand)
export class CreatePaySlipCommandHandler {
  constructor(
    @Inject('IPaySlipRepository')
    private readonly paySlipRepository: IPaySlipRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IFileRepository')
    private readonly fileRepository: IFileRepository,
    @Inject('IsPaySlipAlreadyExist')
    private readonly isPaySlipAlreadyExist: IsPaySlipAlreadyExist
  ) {}

  public async execute(command: CreatePaySlipCommand): Promise<string> {
    const { date, fileId, userId } = command;

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
      (await this.isPaySlipAlreadyExist.isSatisfiedBy(user, new Date(date)))
    ) {
      this.fileRepository.remove(file);

      throw new PaySlipAlreadyExistException();
    }

    const paySlip = await this.paySlipRepository.save(
      new PaySlip(date, file, user)
    );

    return paySlip.getId();
  }
}
