import {QueryHandler} from '@nestjs/cqrs';

import {GetHolidayByIdQuery} from './GetHolidayByIdQuery';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {Inject} from '@nestjs/common';
import {HolidayView} from '../View/HolidayView';
import {HolidayNotFoundException} from 'src/Domain/HumanResource/Holiday/Exception/HolidayNotFoundException';
@QueryHandler(GetHolidayByIdQuery)
export class GetHolidayQueryHandler {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository
  ) {}

  public async execute(query: GetHolidayByIdQuery): Promise<HolidayView> {
    const holiday = await this.holidayRepository.findOneDetailById(query.id);

    // verifier que l'holiday existe

    if (!holiday) {
      throw new HolidayNotFoundException();
    }

    return new HolidayView(
      id,
      holiday.getLeaveType(),
      holiday.getStatus(),
      holiday.getStartDate(),
      holiday.getEndDate(),
      holiday.getDuration()
    );
  }
}
