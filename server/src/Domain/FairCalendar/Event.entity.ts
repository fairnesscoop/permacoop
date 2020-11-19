import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../Task/Task.entity';
import { Project } from '../Project/Project.entity';
import { User } from '../HumanResource/User/User.entity';

export enum EventType {
  MISSION = 'mission',
  SUPPORT = 'support',
  DOJO = 'dojo',
  FORMATION_CONFERENCE = 'formationConference',
  OTHER = 'other'
}

@Entity()
export class Event {
  public static readonly MAXIMUM_TIMESPENT_PER_DAY: number = 720;

  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', {enum: EventType, nullable: false})
  private type: EventType;

  @Column({type: 'integer', nullable: false, comment: 'Stored in minutes'})
  private time: number;

  @Column({type: 'date', nullable: false})
  private date: string;

  @Column({type: 'boolean', default: true})
  private billable: boolean;

  @Column({type: 'varchar', nullable: true})
  private summary: string;

  @ManyToOne(type => Project, {nullable: true})
  private project: Project;

  @ManyToOne(type => Task, {nullable: true})
  private task: Task;

  @ManyToOne(type => User, {nullable: false})
  private user: User;

  constructor(
    type: EventType,
    user: User,
    time: number,
    date: string,
    billable: boolean,
    project?: Project,
    task?: Task,
    summary?: string
  ) {
    this.type = type;
    this.user = user;
    this.time = time;
    this.date = date;
    this.billable = billable;
    this.project = project;
    this.task = task;
    this.summary = summary;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): string {
    return this.type;
  }

  public getTime(): number {
    return this.time;
  }

  public getDate(): string {
    return this.date;
  }

  public isBillable(): boolean {
    return this.billable;
  }

  public getSummary(): string | null {
    return this.summary;
  }

  public getProject(): Project | null {
    return this.project;
  }

  public getTask(): Task | null {
    return this.task;
  }

  public getUser(): User {
    return this.user;
  }

  public update(
    type: EventType,
    time: number,
    billable: boolean,
    project?: Project,
    task?: Task,
    summary?: string
  ): void {
    this.type = type;
    this.time = time;
    this.billable = billable;
    this.project = project;
    this.task = task;
    this.summary = summary;
  }
}
