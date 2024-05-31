import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LeaveRequest } from '../HumanResource/Leave/LeaveRequest.entity';

export enum NotificationType {
  POST = 'post',
  COMMENT = 'comment',
  REACTION = 'reaction'
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: NotificationType, nullable: false })
  private type: NotificationType;

  @Column({ type: 'varchar', nullable: false })
  private resourceId: string;

  @Column({ type: 'varchar', nullable: false })
  private message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => LeaveRequest, { nullable: true, onDelete: 'SET NULL' })
  private leaveRequest: LeaveRequest;

  constructor(
    type: NotificationType,
    message: string,
    resourceId: string,
    leaveRequest: LeaveRequest
  ) {
    this.type = type;
    this.message = message;
    this.resourceId = resourceId;
    this.leaveRequest = leaveRequest;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): string {
    return this.type;
  }

  public getMessage(): string {
    return this.message;
  }

  public getResourceId(): string {
    return this.resourceId;
  }

  public getLeaveRequest(): LeaveRequest {
    return this.leaveRequest;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
