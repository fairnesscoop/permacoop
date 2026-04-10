import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { GetMealTicketsPerMonthQuery } from './GetMealTicketsPerMonthQuery';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {
  FindAllEventsByMonth,
  IEventRepository
} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import { ICooperativeRepository } from 'src/Domain/Settings/Repository/ICooperativeRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';
import { MealTicketsPerMonthView } from '../Views/MealTicketsPerMonthView';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';

@QueryHandler(GetMealTicketsPerMonthQuery)
export class GetMealTicketsPerMonthQueryHandler {
  constructor(
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('ICooperativeRepository')
    private readonly cooperativeRepository: ICooperativeRepository
  ) {}

  public async execute(
    query: GetMealTicketsPerMonthQuery
  ): Promise<MealTicketsPerMonthView[]> {
    const cooperative = await this.cooperativeRepository.find();
    if (!cooperative) {
      throw new CooperativeNotFoundException();
    }

    const { date } = query;
    const [users, mealTicketRemovals] = await Promise.all([
      this.userRepository.findUsers(false, true, false),
      this.mealTicketRemovalRepository.findByMonth(date)
    ]);

    const events: FindAllEventsByMonth[] = await this.eventRepository.findAllEventsByMonth(
      date,
      [EventType.OTHER]
    );

    const mealTicketsByUser = [];
    const mealTicketsRemovalsByUser = [];
    const mealTicketsPerMonthView: MealTicketsPerMonthView[] = [];

    for (const { duration, user } of events) {
      if (duration > cooperative.getDayDuration() / 2) {
        mealTicketsByUser[user] = mealTicketsByUser[user] + 1 || 1;
      }
    }

    for (const { id, count } of mealTicketRemovals) {
      mealTicketsRemovalsByUser[id] = count;
    }

    for (const user of users) {
      const mealTicketRemoval = mealTicketsRemovalsByUser[user.getId()] || 0;
      const mealTicket =
        mealTicketsByUser[user.getId()] - mealTicketRemoval || 0;

      mealTicketsPerMonthView.push(
        new MealTicketsPerMonthView(
          user.getId(),
          user.getFirstName(),
          user.getLastName(),
          mealTicket <= 0 ? 0 : mealTicket,
          mealTicketRemoval
        )
      );
    }

    return mealTicketsPerMonthView;
  }
}
