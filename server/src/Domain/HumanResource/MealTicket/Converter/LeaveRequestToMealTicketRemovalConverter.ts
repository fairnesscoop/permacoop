import { Inject } from '@nestjs/common';
import { IDateUtils } from 'src/Application/IDateUtils';
import { IMealTicketRemovalRepository } from '../Repository/IMealTicketRemovalRepository';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';
import { LeaveRequest } from '../../Leave/LeaveRequest.entity';
import { IsMealTicketRemovalAlreadyExist } from '../Specification/IsMealTicketRemovalAlreadyExist';

export class LeaveRequestToMealTicketRemovalConverter {
  constructor(
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist,
  ) {}

  public async convert(leaveRequest: LeaveRequest): Promise<void> {
    const exceptions: MealTicketRemoval[] = [];
    const dates = this.dateUtils.getWorkedDaysDuringAPeriod(
      new Date(leaveRequest.getStartDate()),
      new Date(leaveRequest.getEndDate())
    );

    if (!dates || 0 === dates.length) {
      return;
    }

    const user = leaveRequest.getUser();

    for (const date of dates) {
      if (true === (await this.isMealTicketRemovalAlreadyExist.isSatisfiedBy(user, date))) {
        continue;
      }

      exceptions.push(
        new MealTicketRemoval(
          date.toISOString(),
          leaveRequest.getUser(),
          'leave',
        )
      );
    }

    await this.mealTicketRemovalRepository.save(exceptions);
  }
}
