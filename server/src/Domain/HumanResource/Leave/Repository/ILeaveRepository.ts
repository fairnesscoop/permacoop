import { Leave } from '../Leave.entity';

export interface ILeaveRepository {
  save(leave: Leave[]): void;
  findMonthlyLeaves(date: string, userId: string): Promise<Leave[]>;
}
