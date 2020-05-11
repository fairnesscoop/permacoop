import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from '../User/User.entity';

export enum HolidayStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REFUSED = 'refused'
}

export enum HolidayLeaveType {
  PAID = 'paid',
  UNPAID = 'unpaid',
  SPECIAL = 'special',
  MEDICAL = 'medical'
}

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', {enum: HolidayStatus, nullable: false})
  private status: HolidayStatus;

  @Column('enum', {enum: HolidayLeaveType, nullable: false})
  private leaveType: HolidayLeaveType;

  @Column({type: 'timestamp', nullable: false})
  private startDate: string;

  @Column({type: 'boolean', nullable: false, default: true})
  private startsAllDay: boolean;

  @Column({type: 'timestamp', nullable: false})
  private endDate: string;

  @Column({type: 'boolean', nullable: false, default: true})
  private endsAllDay: boolean;

  @Column({type: 'varchar', nullable: true})
  private comment: string;

  @Column({type: 'varchar', nullable: true})
  private moderationComment: string;

  @Column({type: 'timestamp', nullable: true})
  private moderateAt: string;

  @ManyToOne(type => User, {nullable: true})
  private moderator: User;

  @ManyToOne(type => User, {nullable: false})
  private user: User;

  constructor(
    user: User,
    leaveType: HolidayLeaveType,
    startDate: string,
    startsAllDay: boolean,
    endDate: string,
    endsAllDay: boolean,
    comment?: string
  ) {
    this.status = HolidayStatus.PENDING;
    this.user = user;
    this.leaveType = leaveType;
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

  public getStatus(): HolidayStatus {
    return this.status;
  }

  public getLeaveType(): HolidayLeaveType {
    return this.leaveType;
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
    this.status = HolidayStatus.REFUSED;
    this.moderator = moderator;
    this.moderateAt = date;
    this.moderationComment = moderationComment;
  }

  public accept(
    moderator: User,
    date: string,
    moderationComment?: string
  ): void {
    this.status = HolidayStatus.ACCEPTED;
    this.moderator = moderator;
    this.moderateAt = date;
    this.moderationComment = moderationComment;
  }
}
