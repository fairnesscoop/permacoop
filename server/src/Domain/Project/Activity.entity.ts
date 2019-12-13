import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../User/User.entity';
import {Project} from './Project.entity';
import {Task} from '../Task/Task.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'integer', nullable: false})
  private time: number;

  @Column({type: 'timestamp', nullable: false})
  private date: Date;

  @Column({type: 'varchar', nullable: true})
  private summary: string;

  @ManyToOne(type => Project, {nullable: false})
  private project: Project;

  @ManyToOne(type => Task, {nullable: false})
  private task: Task;

  @ManyToOne(type => User, {nullable: false})
  private user: User;

  constructor(
    project: Project,
    task: Task,
    user: User,
    time: number,
    summary: string,
    date: Date
  ) {
    this.project = project;
    this.task = task;
    this.user = user;
    this.time = time;
    this.summary = summary;
    this.date = date;
  }

  public getId(): string {
    return this.id;
  }

  public getTime(): number {
    return this.time;
  }

  public getDate(): Date {
    return this.date;
  }

  public getSummary(): string {
    return this.summary;
  }

  public getProject(): Project {
    return this.project;
  }

  public getTask(): Task {
    return this.task;
  }

  public getUser(): User {
    return this.user;
  }
}
