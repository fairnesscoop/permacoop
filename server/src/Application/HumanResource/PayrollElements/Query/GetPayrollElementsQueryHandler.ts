import { Inject } from '@nestjs/common';
import { IQueryBus, QueryHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { IUserAdministrativeRepository } from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import { LeaveView, PayrollElementsView } from '../View/PayrollElementsView';
import { GetPayrollElementsQuery } from './GetPayrollElementsQuery';
import { MealTicketSummaryView } from '../../MealTicket/Views/MealTicketSummaryView';
import { CountMealTicketPerMonthQuery } from '../../MealTicket/Query/CountMealTicketPerMonthQuery';

@QueryHandler(GetPayrollElementsQuery)
export class GetPayrollElementsQueryHandler {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserAdministrativeRepository')
    private readonly userAdministrativeRepository: IUserAdministrativeRepository
  ) {}

  private async getUserMealTickets(): Promise<Map<string, number>> {
    const currentDate = new Date();

    // NOTE: this code suffers from the "N+1 queries" problem, as we fetch the meal tickets count
    // for each user. But we wanted to reuse the existing meal ticket calculation logic,
    // which exists in JavaScript code.
    // Ideally we would move the meal ticket calculation logic to the database.

    const mealTicketsByUserId = new Map<string, number>();

    const _users = await this.userRepository.findUsers(false);

    for (let user of _users) {
      const userAdministrative = await this.userAdministrativeRepository.findOneByUserId(
        user.getId()
      );

      if (userAdministrative.getLeavingDate() !== null) {
        // User is not working here anymore, don't include them in the payroll elements.
        continue;
      }

      const monthSummaries: MealTicketSummaryView[] = await this.queryBus.execute(
        new CountMealTicketPerMonthQuery(user, currentDate)
      );

      const thisMonthSummary = monthSummaries.find(
        view => view.month === currentDate.getMonth()
      );

      mealTicketsByUserId.set(user.getId(), thisMonthSummary.total);
    }

    return mealTicketsByUserId;
  }

  public async execute(
    _: GetPayrollElementsQuery
  ): Promise<PayrollElementsView[]> {
    const sql = `
SELECT
  "user".id AS "userId",
  "firstName",
  "lastName",
  "executivePosition",
  "joiningDate",
  "leavingDate",
  "annualEarnings",
  ("annualEarnings" / 12) AS "monthlyEarnings",
  "workingTime",
  "transportFee",
  "healthInsurance",
  (
    SELECT
      COALESCE(SUM(leave.time / 60.0 / 7.0), 0)
    FROM leave_request
    INNER JOIN leave ON leave."leaveRequestId" = leave_request.id
    INNER JOIN "user" AS u ON u.id = leave_request."userId" AND u.id = "user".id
    WHERE leave_request.status = 'accepted'
    AND leave_request.type = 'paid'
    AND u.id = "user".id
  ) AS "totalPaidLeaves",
  (
    SELECT
      COALESCE(SUM(leave.time / 60.0 / 7.0), 0)
    FROM leave_request
    INNER JOIN leave ON leave."leaveRequestId" = leave_request.id
    INNER JOIN "user" AS u ON u.id = leave_request."userId" AND u.id = "user".id
    WHERE leave_request.status = 'accepted'
    AND leave_request.type = 'unpaid'
  ) AS "totalUnpaidLeaves",
  (
    SELECT
      COALESCE(SUM(leave.time / 60.0 / 7.0), 0)
    FROM leave_request
    INNER JOIN leave ON leave."leaveRequestId" = leave_request.id
    INNER JOIN "user" AS u ON u.id = leave_request."userId" AND u.id = "user".id
    WHERE leave_request.status = 'accepted'
    AND leave_request.type = 'medical'
  ) AS "totalMedicalLeaves",
  (
    SELECT
      COALESCE(SUM(leave.time / 60.0 / 7.0), 0)
    FROM leave_request
    INNER JOIN leave ON leave."leaveRequestId" = leave_request.id
    INNER JOIN "user" AS u ON u.id = leave_request."userId" AND u.id = "user".id
    WHERE leave_request.status = 'accepted'
    AND leave_request.type = 'special'
  ) AS "totalSpecialLeaves"
FROM "user"
INNER JOIN user_administrative AS user_a ON "user"."userAdministrativeId" = user_a.id
WHERE user_a."leavingDate" IS NULL;
    `;

    const rows = await this.manager.query(sql);

    const leaveSql = `
SELECT
  "user".id AS "userId",
  "startDate",
  "endDate"
FROM leave_request
INNER JOIN "user" ON "user".id = leave_request."userId"
WHERE leave_request.status = 'accepted'
ORDER BY "startDate";
    `;

    const leaveRows = await this.manager.query(leaveSql);

    const mealTicketsByUserId = await this.getUserMealTickets();

    return rows.map(
      ({
        userId,
        firstName,
        lastName,
        executivePosition,
        joiningDate,
        leavingDate,
        annualEarnings,
        monthlyEarnings,
        workingTime,
        transportFee,
        healthInsurance,
        totalPaidLeaves,
        totalUnpaidLeaves,
        totalMedicalLeaves,
        totalSpecialLeaves
      }) => {
        const leaves = leaveRows
          .filter(({ userId: leaveUserId }) => leaveUserId === userId)
          .map(({ startDate, endDate }) => new LeaveView(startDate, endDate));

        const mealTickets = mealTicketsByUserId.get(userId);

        return new PayrollElementsView(
          userId,
          firstName,
          lastName,
          executivePosition,
          joiningDate,
          leavingDate,
          +annualEarnings * 0.01,
          +monthlyEarnings * 0.01,
          workingTime,
          +transportFee * 0.01,
          mealTickets,
          healthInsurance,
          +totalPaidLeaves,
          +totalUnpaidLeaves,
          +totalMedicalLeaves,
          +totalSpecialLeaves,
          leaves
        );
      }
    );
  }
}
