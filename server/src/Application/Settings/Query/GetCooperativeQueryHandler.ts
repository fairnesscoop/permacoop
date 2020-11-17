import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCooperativeQuery } from './GetCooperativeQuery';
import { ICooperativeRepository } from 'src/Domain/Settings/Repository/ICooperativeRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';
import { CooperativeView } from '../View/CooperativeView';

@QueryHandler(GetCooperativeQuery)
export class GetCooperativeQueryHandler {
  constructor(
    @Inject('ICooperativeRepository')
    private readonly cooperativeRepository: ICooperativeRepository
  ) {}

  public async execute(query: GetCooperativeQuery): Promise<CooperativeView> {
    const cooperative = await this.cooperativeRepository.find();
    if (!cooperative) {
      throw new CooperativeNotFoundException();
    }

    return new CooperativeView(cooperative.getDayDuration());
  }
}
