import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LeaveRequest } from './LeaveRequest.entity';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, comment: 'Stored in minutes' })
  private time: number;

  @Column({ type: 'date', nullable: false })
  private date: string;

  @ManyToOne(type => LeaveRequest, { nullable: false, onDelete: 'CASCADE' })
  private leaveRequest: LeaveRequest;

  constructor(leaveRequest: LeaveRequest, time: number, date: string) {
    this.leaveRequest = leaveRequest;
    this.time = time;
    this.date = date;
  }

  public getId(): string {
    return this.id;
  }

  public getLeaveRequest(): LeaveRequest {
    return this.leaveRequest;
  }

  public getType(): string {
    return `leave_${this.leaveRequest.getType()}`;
  }

  public getTypeForViewer(viewerId: string): string {
    const actualType = this.leaveRequest.getType();
    const ownerId = this.leaveRequest.getUserId();

    // Menstrual leave is private: only the owner can see the true type
    if (actualType === 'menstrual' && viewerId !== ownerId) {
      return 'leave_paid'; // Display as paid leave to others
    }

    return `leave_${actualType}`;
  }

  public getTime(): number {
    return this.time;
  }

  public getDate(): string {
    return this.date;
  }
}
