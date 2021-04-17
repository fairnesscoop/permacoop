import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaySlipByIdQuery } from './GetPaySlipByIdQuery';
import { PaySlipView } from '../View/PaySlipView';
import { IPaySlipRepository } from 'src/Domain/HumanResource/PaySlip/Repository/IPaySlipRepository';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { FileView } from 'src/Application/File/View/FileView';
import { PaySlipNotFoundException } from 'src/Domain/HumanResource/PaySlip/Exception/PaySlipNotFoundException';

@QueryHandler(GetPaySlipByIdQuery)
export class GetPaySlipByIdQueryHandler {
  constructor(
    @Inject('IPaySlipRepository')
    private readonly payslipRepository: IPaySlipRepository
  ) {}

  public async execute(query: GetPaySlipByIdQuery): Promise<PaySlipView> {
    const paySlip = await this.payslipRepository.findOneById(query.id);
    if (!paySlip) {
      throw new PaySlipNotFoundException();
    }

    const user = paySlip.getUser();
    const file = paySlip.getFile();

    return new PaySlipView(
      paySlip.getId(),
      paySlip.getDate(),
      new UserSummaryView(
        user.getId(),
        user.getFirstName(),
        user.getLastName()
      ),
      new FileView(file.getId(), file.getOriginalName(), file.getSize())
    );
  }
}
