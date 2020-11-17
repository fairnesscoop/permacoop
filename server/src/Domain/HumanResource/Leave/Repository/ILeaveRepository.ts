import { User } from '../../User/User.entity';
import { Leave } from '../Leave.entity';

export interface ILeaveRepository {
  save(leave: Leave[]): void;
  findMonthlyLeaves(date: string, userId: string): Promise<Leave[]>;
  countExistingLeavesByUserAndPeriod(user: User, startDate: string, endDate: string): Promise<number>;
}
