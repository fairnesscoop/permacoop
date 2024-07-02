import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';

export enum Status {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REFUSED = 'refused'
}

export enum Type {
  PAID = 'paid',
  UNPAID = 'unpaid',
  SPECIAL = 'special',
  MEDICAL = 'medical',
  ILLIMITED = 'illimited',
  POSTPONED_WORKED_FREE_DAY = 'postponedWorkedFreeDay',
  RELOCATION = 'relocation'
}

export interface ILeaveRequestModeration {
  getStatus(): string;
  getUserId(): string;
}

export interface ILeaveRequestOwnership {
  getUserId(): string;
}

export interface ILeaveRequestCancellation {
  getUserId(): string;
  getStartDate(): string;
}

@Entity()
export class LeaveRequest implements ILeaveRequestModeration {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: Status, nullable: false })
  private status: Status;

  @Column('enum', { enum: Type, nullable: false })
  private type: Type;

  @Column({ type: 'timestamp', nullable: false })
  private startDate: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  private startsAllDay: boolean;

  @Column({ type: 'timestamp', nullable: false })
  private endDate: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  private endsAllDay: boolean;

  @Column({ type: 'varchar', nullable: true })
  private comment: string;

  @Column({ type: 'varchar', nullable: true })
  private moderationComment: string;

  @Column({ type: 'timestamp', nullable: true })
  private moderateAt: string;

  @ManyToOne(type => User, { nullable: true, onDelete: 'SET NULL' })
  private moderator: User;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  constructor(
    user: User,
    type: Type,
    startDate: string,
    startsAllDay: boolean,
    endDate: string,
    endsAllDay: boolean,
    comment?: string
  ) {
    this.status = Status.PENDING;
    this.user = user;
    this.type = type;
    this.startDate = startDate;
    this.startsAllDay = startsAllDay;
    this.endDate = endDate;
    this.endsAllDay = endsAllDay;
    this.comment = comment;
  }

  public getId(): string {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public getUserId(): string {
    return this.user.getId();
  }

  public getStatus(): Status {
    return this.status;
  }

  public getType(): Type {
    return this.type;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public isStartsAllDay(): boolean {
    return this.startsAllDay;
  }

  public getEndDate(): string {
    return this.endDate;
  }

  public isEndsAllDay(): boolean {
    return this.endsAllDay;
  }

  public getComment(): string {
    return this.comment;
  }

  public getModerator(): User {
    return this.moderator;
  }

  public getModerateAt(): string {
    return this.moderateAt;
  }

  public getModerationComment(): string {
    return this.moderationComment;
  }

  public refuse(
    moderator: User,
    date: string,
    moderationComment?: string
  ): void {
    this.status = Status.REFUSED;
    this.moderator = moderator;
    this.moderateAt = date;
    this.moderationComment = moderationComment;
  }

  public accept(
    moderator: User,
    date: string,
    moderationComment?: string
  ): void {
    this.status = Status.ACCEPTED;
    this.moderator = moderator;
    this.moderateAt = date;
    this.moderationComment = moderationComment;
  }

  public update(
    type: Type,
    startDate: string,
    startsAllDay: boolean,
    endDate: string,
    endsAllDay: boolean,
    comment?: string
  ): void {
    this.type = type;
    this.startDate = startDate;
    this.startsAllDay = startsAllDay;
    this.endDate = endDate;
    this.endsAllDay = endsAllDay;
    this.comment = comment;
  }
}
