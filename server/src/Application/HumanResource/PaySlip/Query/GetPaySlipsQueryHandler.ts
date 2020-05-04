import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetPaySlipsQuery} from './GetPaySlipsQuery';
import {IPaySlipRepository} from 'src/Domain/HumanResource/PaySlip/Repository/IPaySlipRepository';
import {PaySlipView} from '../View/PaySlipView';
import {UserSummaryView} from '../../User/View/UserSummaryView';
import {FileView} from 'src/Application/File/View/FileView';

@QueryHandler(GetPaySlipsQuery)
export class GetPaySlipsQueryHandler {
  constructor(
    @Inject('IPaySlipRepository')
    private readonly paySlipRepository: IPaySlipRepository
  ) {}

  public async execute(query: GetPaySlipsQuery): Promise<PaySlipView[]> {
    const paySlips = await this.paySlipRepository.findAll();
    const paySlipViews: PaySlipView[] = [];

    for (const paySlip of paySlips) {
      const user = paySlip.getUser();
      const file = paySlip.getFile();

      paySlipViews.push(
        new PaySlipView(
          paySlip.getId(),
          paySlip.getDate(),
          new UserSummaryView(
            user.getId(),
            user.getFirstName(),
            user.getLastName()
          ),
          new FileView(file.getId(), file.getOriginalName(), file.getSize())
        )
      );
    }

    return paySlipViews;
  }
}
