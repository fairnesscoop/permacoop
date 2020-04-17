import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../User/User.entity';
import {Task} from '../Task/Task.entity';
import {Project} from '../Project/Project.entity';

export enum EventType {
  MISSION = 'mission',
  SUPPORT = 'support',
  DOJO = 'dojo',
  FORMATION_CONFERENCE = 'formationConference',
  HOLIDAY = 'holiday',
  MEDICAL_LEAVE = 'medicalLeave',
  OTHER = 'other'
}

@Entity()
export class Event {
  // Times spent are stored in base 100
  public static readonly MAXIMUM_TIMESPENT_PER_DAY: number = 100;
  public static readonly WORKED_TYPES: string[] = [
    EventType.MISSION,
    EventType.SUPPORT,
    EventType.DOJO,
    EventType.FORMATION_CONFERENCE
  ];

  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', {enum: EventType, nullable: false})
  private type: EventType;

  @Column({type: 'integer', nullable: false})
  private time: number;

  @Column({type: 'date', nullable: false})
  private date: string;

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
    project?: Project,
    task?: Task,
    summary?: string
  ) {
    this.type = type;
    this.user = user;
    this.time = time;
    this.date = date;
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
    project?: Project,
    task?: Task,
    summary?: string
  ): void {
    this.type = type;
    this.time = time;
    this.project = project;
    this.task = task;
    this.summary = summary;
  }
}
