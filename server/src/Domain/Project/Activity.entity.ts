import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Project} from './Project.entity';
import {User} from '../User/User.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type: 'integer', nullable: false})
  public time: number;

  @Column({type: 'timestamp', nullable: false})
  public date: Date;

  @Column({type: 'varchar', nullable: true})
  public summary: string;

  @ManyToOne(type => Project, {nullable: false})
  public project: Project;

  @ManyToOne(type => User, {nullable: false})
  public user: User;

  constructor(activity: Partial<Activity>) {
    Object.assign(this, activity);
  }
}
