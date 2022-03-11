import { instance, mock, when, verify, deepEqual } from 'ts-mockito';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import {
  LeaveRequest,
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { LeaveRequestToMealTicketRemovalConverter } from './LeaveRequestToMealTicketRemovalConverter';
import { IsMealTicketRemovalAlreadyExist } from '../Specification/IsMealTicketRemovalAlreadyExist';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';

describe('LeaveRequestToMealTicketRemovalConverter', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let leaveRequestToMealTicketRemovalConverter: LeaveRequestToMealTicketRemovalConverter;
  let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;

  const user = mock(User);

  beforeEach(() => {
    isMealTicketRemovalAlreadyExist = mock(isMealTicketRemovalAlreadyExist);
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    leaveRequestToMealTicketRemovalConverter = new LeaveRequestToMealTicketRemovalConverter(
      instance(mealTicketRemovalRepository),
      instance(dateUtilsAdapter),
      instance(isMealTicketRemovalAlreadyExist)
    );
  });

  it('testConvert', async () => {
    const leaveRequest = mock(LeaveRequest);

    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.getUser()).thenReturn(instance(user));
    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([
      new Date('2020-12-24'),
      new Date('2020-12-28'),
      new Date('2020-12-29'), // already exist
      new Date('2020-12-30'),
      new Date('2020-12-31'),
      new Date('2021-01-04')
    ]);

    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-24')))
    ).thenResolve(false);
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-28')))
    ).thenResolve(false);
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-29')))
    ).thenResolve(true);
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-30')))
    ).thenResolve(false);
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-31')))
    ).thenResolve(false);
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2021-01-04')))
    ).thenResolve(false);

    await leaveRequestToMealTicketRemovalConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-24')))
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-28')))
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-29')))
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-30')))
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2020-12-31')))
    ).once();
    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), deepEqual(new Date('2021-01-04')))
    ).once();
    verify(
      mealTicketRemovalRepository.save(
        deepEqual([
          new MealTicketRemoval('2020-12-24T00:00:00.000Z', instance(user), 'leave'),
          new MealTicketRemoval('2020-12-28T00:00:00.000Z', instance(user), 'leave'),
          new MealTicketRemoval('2020-12-30T00:00:00.000Z', instance(user), 'leave'),
          new MealTicketRemoval('2020-12-31T00:00:00.000Z', instance(user), 'leave'),
          new MealTicketRemoval('2021-01-04T00:00:00.000Z', instance(user), 'leave')
        ])
      )
    ).once();
  });
});
