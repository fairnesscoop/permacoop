import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetPayStubsQuery} from './GetPayStubsQuery';
import {IPayStubRepository} from 'src/Domain/HumanResource/PayStub/Repository/IPayStubRepository';
import {PayStubView} from '../View/PayStubView';
import {UserSummaryView} from '../../User/View/UserSummaryView';
import {FileView} from 'src/Application/File/View/FileView';

@QueryHandler(GetPayStubsQuery)
export class GetPayStubsQueryHandler {
  constructor(
    @Inject('IPayStubRepository')
    private readonly payStubRepository: IPayStubRepository
  ) {}

  public async execute(query: GetPayStubsQuery): Promise<PayStubView[]> {
    const payStubs = await this.payStubRepository.findAll();
    const payStubViews: PayStubView[] = [];

    for (const payStub of payStubs) {
      const user = payStub.getUser();
      const file = payStub.getFile();

      payStubViews.push(
        new PayStubView(
          payStub.getId(),
          payStub.getDate(),
          new UserSummaryView(
            user.getId(),
            user.getFirstName(),
            user.getLastName()
          ),
          new FileView(file.getId(), file.getOriginalName(), file.getSize())
        )
      );
    }

    return payStubViews;
  }
}
